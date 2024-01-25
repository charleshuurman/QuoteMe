const typeDefs = `
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Quote {
    _id: ID
    content: String
    emotion: String
    isPrivate: Boolean
    isGenerated: Boolean
    liked: Boolean
    createdAt: String
    userName: String
    reactions: [Reaction]
    comments: [Comment]
  }

  type Reaction {
    _id: ID
    content: String
    user: User
    reactionId: ID
    reactionBody: String
    userName: String
    createdAt: String
  }

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
    quotes: [Quote]
    friends: [User]
    subscription: Int
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    getQuote(_id: ID!): Quote
    getMyQuotes: [Quote]
    listQuotes: [Quote]
    users: [User]
    quotes (userId: ID!): [Quote]
    quote (quoteId: ID!): Quote
    allquotes: [Quote]
    singleUser (userId: ID!): User
    publicQuotes: [Quote]
    privateQuotes: [Quote]
  }

  type Mutation {
    addUser(userName: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(userName: String!, firstName: String!, lastName: String!, email: String!, password: String!): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    createQuote(content: String!, emotion: String!, isPrivate: Boolean!, isGenerated: Boolean!, liked: Boolean!): Quote
    updateQuote(_id: ID!, content: String!, emotion: String!, isPrivate: Boolean!, isGenerated: Boolean!, liked: Boolean!): Quote
    deleteQuote(_id: ID!): Quote
    likeQuote(quoteId: ID!): Quote
    unlikeQuote(quoteId: ID!): Quote
    createComment(quoteId: ID!, commentText: String!): Quote
    deleteComment(quoteId: ID!, commentId: ID!): Quote
  }
`;

// TODO: Add query and mutations required for the front-end

// API Documentation

// Quote section
// -------------

// listQuotes --- lists all quotes
// Example:
// Query listQuotes {
//   listQuotes {
//     _id
//     content
//     emotion
//     isPrivate
//     isGenerated
//     userName
//     reactions {
//       reactionBody
//       userName
//     }
//   }
// }

// listQuotes: [Quote]
//   List all quotes in database (TODO: should only be doable by admin user)

// publicQuotes: [Quote]
//   List all only publicly available quotes (for the Bulletin)

// privateQuotes: [Quote]
//   List only private quotes (TODO: based on the logged in user)


// createQuote --- create a quote
// - Example Apollo graphQL Query
// mutation mut001($content: String!, $emotion: String!, $isPrivate: Boolean!, $isGenerated: Boolean!, $liked: Boolean!) {
//   createQuote(content: $content, emotion: $emotion, isPrivate: $isPrivate, isGenerated: $isGenerated, liked: $liked) {
//     _id
//     content
//     emotion
//     isPrivate
//     isGenerated
//     liked
//     createdAt
//     userName
//   }
// }
// - Example Apollo graphQL variables
// {
//   "content": "Hello, world!  This is a quote!",
//   "emotion": "Happy",
//   "isPrivate": false,
//   "isGenerated": true,
//   "liked": true,
//   "userName": "userName",
// }

// deleteQuote --- delete a quote and remove the quote from the user's quotes array
// - Example Apollo graphQL Query
// mutation mut002($deleteQuoteId: ID!) {
//   deleteQuote(_id: $deleteQuoteId) {
//     _id
//     content
//     emotion
//     isPrivate
//     isGenerated
//     liked
//     createdAt
//     userName
//     reactions {
//       _id
//       content
//     }
//     comments {
//       commentText
//       commentAuthor
//       createdAt
//     }
//   }
// }
// - Example variables
// {"deleteQuoteId": "65b19596c8ec92e88047c2fe"}

// updateQuote --- modify the properties of a Quote (TODO: ensure properties like userName and createdAt isn't updatable)
// - Example Apollo query
// mutation mut003($updateQuoteId: ID!, $content: String!, $emotion: String!, $isPrivate: Boolean!, $isGenerated: Boolean!, $liked: Boolean!) {
//   updateQuote(_id: $updateQuoteId, content: $content, emotion: $emotion, isPrivate: $isPrivate, isGenerated: $isGenerated, liked: $liked) {
//     _id
//     content
//     emotion
//     isPrivate
//     isGenerated
//     liked
//   }
// }
// - Example variables
// {
// "updateQuoteId": "65b1f17a2b0e9e91d79a3124",
// "content": "Hello, world update 2!  This is a quote updated twice!",
// "emotion": "Joy",
// "isPrivate": false,
// "isGenerated": true,
// "liked": true,
// }


// Add mutations
//   Add a Quote(post)
//   Delete a Quote
//   Add a Reaction to the Quote
//   Delete a Reaction from a Quote
//   Add a Mood (?)
//   Delete a Mood (?)

// getQuote(_id: ID!): Quote
// getMyJournal(): [Quote]
// getBulletins(): [Quote]


// API interface:
// (getQuote, getBulletins, getMyJournal), then mutations (ie. createQuote, deleteQuote, updateQuote, likeQuote, createComment ).

module.exports = typeDefs;
