const { User, Product, Category, Order, Quote } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { UserNotFoundError, QuoteNotFoundError } = require('../utils/errors.js');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    //   getQuotes: async (_, { emotions }) => {
    //     try {
    //       const prompt = `You are an affirmations generator. When provided a user's emotions, please respond with only 3 quotes to uplift that person. The user's answers, when asked how they are feeling right now, are: ${emotions.join(", ")}`;

    //       const options = {
    //         method: 'POST',
    //         url: process.env.RAPIDAPI_URL, // OpenAI URL
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    //           'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    //         },
    //         data: { prompt: prompt },
    //       };

    //       const response = await axios.request(options);

    //       return response.data.choices.map(choice => ({ text: choice }));
    //     } catch (error) {
    //       console.error('Error in getQuotes:', error);
    //       throw new Error('Error fetching quotes');
    //     }
    //   }
    // },

    // TODO: populate getQuote, getBulletins, getMyJournal!
    // getQuote: async() => {
    //   console.log('getQuote');
    // },
    // getBulletins: async() => {
    //   console.log('getBulletins');
    // },
    // getMyJournal: async() => {
    //   console.log('getMyJournal');
    // },

    // getBulletins: async () => {
    //   return null;
    // },

    listQuotes: async () => {
      return await Quote.find();
    },

    publicQuotes: async () => {
      return await Quote.find({ isPrivate: false });
    },

    privateQuotes: async (parent, args, context) => {
      return await Quote.find({ isPrivate: true });
    },

    getMyQuotes: async (parent, args, context) => {
      console.log("User ", context.user);
      if (context.user) {
        const user = await User.findById(context.user._id);

        return await Quote.find({ userName: user.userName });
      }

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
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    singleUser: async (parent, { userId }) => {
      console.log("singleUser");
      return User.findOne({ _id: userId });
    },

    users: async () => {
      console.log("users");
      return User.find().populate(['quotes', 'friends']);
    },
    quotes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Quote.find(params).sort({ createdAt: -1 });
    },
    quote: async (parent, { quoteId }) => {
      return Quote.findOne({ _id: quoteId });
    },
    allquotes: async () => {
      return Quote.find().populate(['comments', 'reactions']);
    },

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
    }
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

    // TODO: populate  createQuote, deleteQuote, updateQuote, likeQuote, createComment

    // Create a Quote
    createQuote: async (parent, args, context) => {
      console.log('createQuote', args);
      // console.log('usercontext', context.user);

      const user = await User.findById(context.user._id);

      if (context.user) {

        args.userName = context.user.userName;
        const createdQuote = await Quote.create(args);
        // await createdThought.save();
        const updatedUser = await User.findByIdAndUpdate(context.user._id,
          { $addToSet: { quotes: createdQuote._id } },
          { runValidators: true, new: true });

        return updatedUser;
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
