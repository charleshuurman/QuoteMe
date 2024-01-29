const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'project3group10secret';
const expiration = '2h';

// Note: the weakness of this JWT implementation is when the db is reseeded, the old user token seems to still be running in React.
// There needs to be a faster way to force a user to relogin if the database is reseeded and users are shuffled, although this seems only important for development. In production users might want to keep their state information despite databases being reloaded.

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, userName, email, _id }) {
    const payload = { firstName, userName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
