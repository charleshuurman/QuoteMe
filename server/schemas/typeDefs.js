/**
 * This file contains the GraphQL schema definitions for the QuoteMe application. It defines the structure
 * of data types, queries, mutations, and relationships between data entities such as Users, Quotes, Comments,
 * Affirmations, Products, Orders, and more. These definitions serve as the backbone for the GraphQL API, 
 * dictating how data can be queried and manipulated through the API.
 */
const typeDefs = `
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }
  
  type Affirmation {
    _id: ID
    content: String
    emotion: String
    createdAt: String
    updatedAt: String
  }

  type AiAffirmation {
    _id: ID
    content: String
    emotion: String
    createdAt: String
  }

  type Quote {
    _id: ID
    content: String
    emotion: String
    isPrivate: Boolean
    isGenerated: Boolean
    imageUrl: String
    createdAt: String
    userName: String
    reactions: [Reaction]
    comments: [Comment]
  }

  type Reaction {
    _id: ID
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
    savedAffirmations: [Affirmation]!
    friends: [User]
    tier: Int
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
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    savedAffirmations: [Affirmation]
    affirmationsByEmotion(emotion: String!): [Affirmation]
    user: User
    getMyQuotes: [Quote]
    allquotes: [Quote]
    listQuotes: [Quote]
    users: [User]
    publicQuotes: [Quote]
    analyzeQuote(quoteId: ID!): AiAffirmation
    singleUserByUsrName (userName: String!): User
    singleUserById (userId: ID!): User
    quotes (userName: String!): [Quote]
    quote (quoteId: ID!): Quote
  }

  type Mutation {
    addUser(userName: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(userName: String!, firstName: String!, lastName: String!, email: String!, password: String!): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    createQuote(content: String!, emotion: String!, isPrivate: Boolean!, isGenerated: Boolean!, imageUrl: String!): Quote
    updateQuote(_id: ID!, content: String!, emotion: String!, isPrivate: Boolean!, isGenerated: Boolean!, imageUrl: String!): Quote
    deleteQuote(_id: ID!): Quote
    likeQuote(quoteId: ID!): Quote
    unlikeQuote(quoteId: ID!): Quote
    addReaction(quoteId: ID!, reactionText: String!): Quote
    delReaction(quoteId: ID!, reactionText: String!): Quote
    setPrivate(quoteId: ID!): Quote
    setPublic(quoteId: ID!): Quote
    createComment(quoteId: ID!, commentText: String!): Quote
    deleteComment(quoteId: ID!, commentId: ID!): Quote
    saveAffirmation(affirmationId: ID!): User
    unsaveAffirmation(affirmationId: ID!): User
  }
`;

module.exports = typeDefs;
