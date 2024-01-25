const { Schema, model, Types } = require('mongoose');
const { reactionSchema } = require('./Reaction');
const { formatDate } = require('../utils/utils.js');

// Mongoose schema and model to specify quote objects.
// Quotes are created by users. Quotes can have attached reactions from other users.
// The quote model contain usernames which references the User model.

const quoteSchema = new Schema(
  {
    content: {
      type: String,
      required: "Please enter a quote",
      minLength: 1,
      maxLength: 280
    },
    emotion: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: true
    },
    isGenerated: {
      type: Boolean,
      default: false
    },
    imageUrl: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now, // date timestamp added automatically (if date is not specified upon creation)
      get: formatDate,   // format the date
    },
    userName: {
      type: String,      // username
      required: true,
      ref: 'User',       // references the 'User' model
    },
    reactions: [reactionSchema],  // reactionSchema specifies a Mongoose subdocument
    comments: [
      {
        commentText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        commentAuthor: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
  
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
quoteSchema.virtual('reactionCount').get(function () {
  if (this.reactions) {
    return this.reactions.length;
  };
});

// Assign the schema to the MongoDB database model
const Quote = model('Quote', quoteSchema);

module.exports = quoteSchema;
module.exports = Quote;
