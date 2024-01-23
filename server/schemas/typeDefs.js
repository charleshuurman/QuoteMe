const typeDefs = `
  type Quote {
    _id: ID
    content: String
    emotion: Mood
    isprivate: Boolean
    user: User
    reactions: [Reaction]
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
    email: String
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
    getQuotes(emotions: [String]): [Quote]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
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

module.exports = typeDefs;
