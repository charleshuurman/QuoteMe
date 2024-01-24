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
    emotion: Mood
    isPrivate: Boolean
    isGenerated: Boolean
    liked: Boolean
    createdAt: String    
    username: String
    comments: [Comment]
  }

  type Reaction {
    _id: ID
    content: String
    user: User
  }

  type Mood {
    _id: ID
    mood: String
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
    listQuotes: [Quote]
    users: [User]
    quotes (userId: ID!): [Quote]
    quote (quoteId: ID!): Quote
    allquotes: [Quote]
    singleUser (userId: ID!): User
  }

  type Mutation {
    addUser(userName: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(userName: String!, firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    createQuote(content: String!): Quote
    updateQuote(_id: ID!): Quote
    deleteQuote(_id: ID!): Quote
    likeQuote(quoteId: ID!): Quote
    unlikeQuote(quoteId: ID!): Quote
    createComment(quoteId: ID!, commentText: String!): Quote
    deleteComment(quoteId: ID!, commentId: ID!): Quote
  }
`;

// TODO:  Add these for TypeDefs and Resolvers.js (take care to ensure Mongoose Models work with the resolvers)
// Add queries
//   Get all public Quotes from All Users (for the Bulletin)
//   Get all Quotes from the current logged in user (for the Journal)

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
