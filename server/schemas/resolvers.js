const { User, Product, Category, Order, Quote, Affirmation } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { UserNotFoundError, QuoteNotFoundError, UserNotOwnerError } = require('../utils/errors.js');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { llmGetFriendResponse } = require ('../utils/llm.js');


const resolvers = {
  Query: {

    listQuotes: async () => {
      return await Quote.find();
    },

    publicQuotes: async () => {
      return await Quote.find({ isPrivate: false });
    },

    /**
     * getMyQuotes - retrieve all quote objects for the logged-in user. User must have an active and valid token.
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context --- authentication context under user contains the token information (JWT)
     * @returns 
     */
    getMyQuotes: async (parent, args, context) => {
      console.log("User ", context.user);
      if (context.user) {
        const user = await User.findById(context.user._id);

        return await Quote.find({ userName: user.userName });
      }

      throw AuthenticationError;
    },

// Example LLM output:
// Utils openai call return:  {
//   index: 0,
//   message: {
//     role: 'assistant',
//     content: `{"emotion": "amusement", "affirmation": "That sounds like a fun and interesting experience! It's always fascinating to observe unusual phenomena like 
// zing bubbles. As for getting on the teacher's bad side, we all have our moments. Don't worry, it happens to everyone. Just keep being yourself and things will get better!"}`
//   },
//   logprobs: null,
//   finish_reason: 'stop'
// }

    /**
     * analyzeQuote - get an llm chatbot personality to respond to the user's Quote
     * @param {*} parent 
     * @param {*} param1 
     * @param {*} context 
     * @returns a Quote object, where the llm chatbot response is in the new quote object content
     */
    analyzeQuote: async (parent, { quoteId }, context) => {
      console.log('analyzeQuote', quoteId);
      if (context.user) {
        const quoteToAnalyze = await Quote.findById(quoteId);
        // Ensure only the onwer can update the quote
        if (quoteToAnalyze.userName === context.user.userName) {
          // console.log("getting analysis on:", quoteToAnalyze.content);
          let result = await llmGetFriendResponse(quoteToAnalyze.content);
          // console.log("llmGetFriendResponse result:", result.message.content);
          quoteToAnalyze.isGenerated = true;
          quoteToAnalyze.isPrivate = true;
          quoteToAnalyze.emotion = JSON.parse(result.message.content).emotion;
          quoteToAnalyze.content = JSON.parse(result.message.content).affirmation;
          quoteToAnalyze.createdAt = Date.now;
          console.log("result:", quoteToAnalyze);
          return quoteToAnalyze;
        } else {
          throw UserNotOwnerError;
        };
      };
      throw AuthenticationError;
    },

    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      // console.log('User query', parent, args, context);
      if (context.user) {
        const user = await User.findById(context.user._id).populate(['quotes', 'friends']);

        // user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },

    singleUserById: async (parent, { userId }) => {
      console.log("singleUserById");
      return User.findOne({ _id: userId }).populate('quotes');
    },

    singleUserByUsrName: async (parent, { userName }) => {
      console.log("singleUserByUsrName");
      return User.findOne({ userName: userName }).populate('quotes');
    },

    users: async () => {
      console.log("users");
      return User.find().populate(['quotes', 'friends']);
    },

    quotes: async (parent, { userName }) => {
      const params = userName ? { userName: userName } : {};
      return Quote.find(params).sort({ createdAt: -1 });
    },
    quote: async (parent, { quoteId }) => {
      return Quote.findOne({ _id: quoteId });
    },
    allquotes: async () => {
      return Quote.find().populate(['comments', 'reactions']);
    },

    // The following is for the stripe shop implementation
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },
    async affirmationsByEmotion(parent, { emotion }, context, info) {
      try {
        const affirmations = await Affirmation.find({ emotion: emotion });
        return affirmations;
      } catch (error) {
        console.error('Error fetching affirmations by emotion:', error);
        throw new Error('Error fetching affirmations by emotion');
      }
    },  
    savedAffirmations: async (_, __, { user }) => {
      if (!user) throw new Error("You must be logged in to see this.");

      const currentUser = await User.findById(user._id)
        .populate('savedAffirmations') // Populate the savedAffirmations field
        .exec();

      return currentUser.savedAffirmations;
    },  
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    async saveAffirmation(parent, { affirmationId }, context) {
      if (!context.user) {
        throw new Error('Not authenticated or unauthorized action');
      }

      try {
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error('User not found');
        }

        // Use $addToSet to avoid duplicates
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedAffirmations: affirmationId } },
          { new: true } // Return the updated document
        );

        return updatedUser;
      } catch (error) {
        console.error('Error saving affirmation:', error);
        throw new Error('Error saving affirmation');
      }
    },

    async unsaveAffirmation(parent, { affirmationId }, context) {
      if (!context.user) {
        throw new Error('Not authenticated or unauthorized action');
      }

      try {
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error('User not found');
        }

        // Use Mongoose update to pull the affirmation from savedAffirmations
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedAffirmations: affirmationId } },
          { new: true } // Return the updated document
        );

        return updatedUser;
      } catch (error) {
        console.error('Error unsaving affirmation:', error);
        throw new Error('Error unsaving affirmation');
      }
    },


    // The following resolvers manage the Quote posts from the user.
    // createQuote, deleteQuote works and tested

    // Create a Quote
    createQuote: async (parent, args, context) => {
      console.log('createQuote', args);

      const user = await User.findById(context.user._id);

      if (context.user) {

        args.userName = context.user.userName;
        const createdQuote = await Quote.create(args);
        const updatedUser = await User.findByIdAndUpdate(context.user._id,
          { $addToSet: { quotes: createdQuote._id } },
          { runValidators: true, new: true });

        return createdQuote;
      }

      throw AuthenticationError;
    },

    // Delete a Quote
    deleteQuote: async (parent, { _id }, context) => {
      console.log('deleteQuote', _id, context.user);

      // Check if the user is logged in via the context
      if (context.user) {

        const quoteToDelete = await Quote.findById(_id);

        // Check if we found the quote specified by the Quote's _id
        if (quoteToDelete) {
          quoteToDelete.userName = context.user.userName;
          console.log('Found quotetodelete:', quoteToDelete);

          // Check to see if the user logged in is the one that created the Quote object.
          if (quoteToDelete.userName === context.user.userName) {
            console.log('deleting ', quoteToDelete.toJSON());
            const updatedUser = await User.findByIdAndUpdate(context.user._id,
              { $pull: { quotes: quoteToDelete._id } },
              { runValidators: true, new: true });
            const deletedQuote = await Quote.deleteOne({ _id: _id });
            return quoteToDelete;
          } else {
            console.log('Error: username is different from the user that is logged in');
            throw UserNotFoundError;
          }
        } else {
          console.log('Cannot delete: No such quote _id exists');
          throw QuoteNotFoundError;
        }
      } else {
        throw AuthenticationError;
      }
    },

    // Update a Quote
    updateQuote: async (parent, args, context) => {
      console.log('updateQuote', args._id, context.user);

      // Check if the user is logged in via the context
      if (context.user) {

        const quoteToUpdate = await Quote.findById(args._id);

        // Check if we found the quote specified by the Quote's _id
        if (quoteToUpdate) {
          console.log('Found quotetoupdate:', quoteToUpdate);

          // Check to see if the user logged in is the one that created the Quote object (everyone else is unauthorized to delete this)
          if (quoteToUpdate.userName === context.user.userName) {
            console.log('updating ', quoteToUpdate.toJSON());
            const updatedQuote = await Quote.findByIdAndUpdate(args._id,
              args,
              { runValidators: true, new: true });
            return updatedQuote;
          } else {
            console.log('Error: username is different from the user that is logged in');
            throw UserNotFoundError;
          }
        } else {
          console.log('Cannot delete: No such quote _id exists');
          throw QuoteNotFoundError;
        }
      } else {
        throw AuthenticationError;
      };
    },

    // TODO: likeQuote keeps adding likes indefinitely, while unlikeQuote removes everything all at once. Need to fix these behaviors.
    // Kept here to be referenced by some ongoing code. Use addReaction instead to implement reactions to Quotes (including likes).
    likeQuote: async (parent, { quoteId }, context) => {
      console.log('likeQuote');

      // Check if the user is logged in via the context
      if (context.user) {

        const quoteToUpdate = await Quote.findById(quoteId).populate('reactions').exec();

        // Check if we found the quote specified by the Quote's _id
        if (quoteToUpdate) {
          console.log('Found quote to like:', quoteToUpdate);

          const updatedQuote = await Quote.findByIdAndUpdate(quoteId,
            { $addToSet: { reactions: { userName: context.user.userName, reactionBody: "like" } } },
            { runValidators: true, new: true }).populate('reactions');
          return updatedQuote;
        } else {
          console.log('Cannot like: No such quote _id exists');
          throw QuoteNotFoundError;
        }
      } else {
        throw AuthenticationError;
      };
    },

    unlikeQuote: async (parent, { quoteId }, context) => {
      console.log('unlikeQuote');

      // Check if the user is logged in via the context
      if (context.user) {
        const quoteToUpdate = await Quote.findById(quoteId);

        // Check if we found the quote specified by the Quote's _id
        if (quoteToUpdate) {
          console.log('Found quote to unlike:', quoteToUpdate);

          const updatedQuote = await Quote.findByIdAndUpdate(quoteId,
            { $pull: { reactions: { userName: context.user.userName, reactionBody: "like" } } },
            { runValidators: true, new: true });
          return updatedQuote;
        } else {
          console.log('Cannot like: No such quote _id exists');
          throw QuoteNotFoundError;
        }
      } else {
        throw AuthenticationError;
      };
    },

    // addReaction will add reactions into a user's Quote object, and deleteReaction will delete it.
    addReaction: async (parent, { quoteId, reactionText }, context) => {
      console.log('addReaction');

      // Check if the user is logged in via the context
      if (context.user) {

        const quoteToUpdate = await Quote.findById(quoteId).populate('reactions').exec();

        // Check if we found the quote specified by the Quote's _id
        if (quoteToUpdate) {
          console.log('Found quote to add a reaction to:', quoteToUpdate);

          const updatedQuote = await Quote.findByIdAndUpdate(quoteId,
            { $addToSet: { reactions: { userName: context.user.userName, reactionBody: reactionText } } },
            { runValidators: true, new: true }).populate('reactions');
          return updatedQuote;
        } else {
          console.log('Cannot like: No such quote _id exists');
          throw QuoteNotFoundError;
        }
      } else {
        throw AuthenticationError;
      };
    },

    delReaction: async (parent, { quoteId, reactionText }, context) => {
      console.log('delete reaction');

      // Check if the user is logged in via the context
      if (context.user) {
        const quoteToUpdate = await Quote.findById(quoteId);

        // Check if we found the quote specified by the Quote's _id
        if (quoteToUpdate) {
          console.log('Found quote to delete reaction from:', quoteToUpdate);

          const updatedQuote = await Quote.findByIdAndUpdate(quoteId,
            { $pull: { reactions: { userName: context.user.userName, reactionBody: reactionText } } },
            { runValidators: true, new: true });
          return updatedQuote;
        } else {
          console.log('Cannot like: No such quote _id exists');
          throw QuoteNotFoundError;
        }
      } else {
        throw AuthenticationError;
      };
    },

    setPrivate: async (parent, { quoteId }, context) => {
      console.log('setPrivate', quoteId);
      if (context.user) {
        const quoteToUpdate = await Quote.findById(quoteId);
        // Ensure only the onwer can update the quote
        if (quoteToUpdate.userName === context.user.userName) {
          return await Quote.findByIdAndUpdate(quoteId, { "isPrivate": true }, { new: true });
        } else {
          throw UserNotOwnerError;
        };
      };
      throw AuthenticationError;
    },

    setPublic: async (parent, { quoteId }, context) => {
      console.log('setPublic', quoteId);
      if (context.user) {
        const quoteToUpdate = await Quote.findById(quoteId);
        // Ensure only the onwer can update the quote
        if (quoteToUpdate.userName === context.user.userName) {
          return await Quote.findByIdAndUpdate(quoteId, { "isPrivate": false }, { new: true });
        } else {
          throw UserNotOwnerError;
        };
      };
      throw AuthenticationError;
    },

    // The following is an implementation of the comment system so users can initiate discussions in response to other users's Quotes
    createComment: async (parent, { quoteId, commentText }, context) => {
      console.log('createComment');

      // For debugging purpose only, delete this code when running with client

      const UserInfo = {
        username: "barbara"
      }

      context.user = UserInfo;

      // For debugging purpose only

      if (context.user) {
        return Quote.findOneAndUpdate(
          { _id: quoteId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;

    },
    deleteComment: async (parent, { quoteId, commentId }, context) => {
      console.log('deleteComment');

      // For debugging purpose only, delete this code when running with client

      const UserInfo = {
        username: "barbara"
      }

      context.user = UserInfo;

      // For debugging purpose only


      if (context.user) {
        return Quote.findOneAndUpdate(
          { _id: quoteId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

  }
};

module.exports = resolvers;
