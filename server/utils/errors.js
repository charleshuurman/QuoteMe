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
};