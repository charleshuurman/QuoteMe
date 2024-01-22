const { Schema, model, Types } = require('mongoose');
const { reactionSchema } = require('./Reaction');
const { formatDate } = require('./utils');

// Mongoose schema and model to specify thought objects.
// Thoughts are created by users. Thoughts can have attached reactions from other users.
// The thought model contain usernames which references the User model.

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Please enter a thought",
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now, // date timestamp added automatically (if date is not specified upon creation)
      get: formatDate,   // format the date
    },
    username: {
      type: String,      // username
      required: true,
      ref: 'User',       // references the 'User' model
    },
    reactions: [reactionSchema],  // reactionSchema specifies a Mongoose subdocument
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtSchema.virtual('reactionCount').get(function () {
  if (this.reactions) {
    return this.reactions.length;
  };
});

// Assign the schema to the MongoDB database model
const Thought = model('Thought', thoughtSchema);

module.exports = thoughtSchema;
module.exports = Thought;
