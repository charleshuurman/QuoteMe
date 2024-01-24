const { User, Product, Category, Order, Quote } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
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
      let results = await User.find();
      console.log (results);
      return [];
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

    createQuote: async (parent, args, context) => {
      console.log('createQuote');
      return null;
    },
    deleteQuote: async (parent, args, context) => {
      console.log('deleteQuote');
    },
    updateQuote: async (parent, args, context) => {
      console.log('updateQuote');
    },

    likeQuote: async (parent, {quoteId}) => {
      console.log('likeQuote');      

      return await Quote.findByIdAndUpdate(quoteId, { "liked": true }, { new: true });
    },

    unlikeQuote: async (parent, {quoteId}) => {
      console.log('unlikeQuote');      

      return await Quote.findByIdAndUpdate(quoteId, { "liked": false }, { new: true });
    },

    createComment: async (parent, {quoteId, commentText}, context) => {
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
    deleteComment: async (parent, {quoteId, commentId}, context) => {
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
