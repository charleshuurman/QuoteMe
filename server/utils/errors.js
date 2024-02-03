const { GraphQLError } = require('graphql');

module.exports = {
  UserNotFoundError: new GraphQLError('Could not find user _id.', {
    extensions: {
      code: 'USERNOTFOUND',
    },
  }),
  QuoteNotFoundError: new GraphQLError('Could not find quote _id.', {
    extensions: {
      code: 'QUOTENOTFOUND',
    },
  }),
  UserNotOwnerError: new GraphQLError('User is not owner of quote.', {
    extensions: {
      code: 'NOTOWNER',
    },
  }),
};

/**
 * This module exports a set of custom GraphQL errors designed to provide more detailed and specific feedback for
 * various error conditions encountered in the QuoteMe application. These errors enhance the API's robustness by
 * clearly communicating to clients the nature of the error, facilitating easier debugging and error handling on
 * both the client and server sides.
 */
