const { Schema, Types } = require('mongoose');
const { formatDate } = require('./utils');

// Mongoose schema to specify reactions inside thoughts
//   This schema is used for validation and is to be placed as a mongoose subdocument to Thoughts { reactions: [reactionSchema]}
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,  // custom ObjectId instead of Mongoose's built-in _id
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // sets the creation date/time
      get: formatDate,  // getter function formats the date
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    _id: false, // don't add _id automatically since we already have reactionId
  }
);

module.exports = { reactionSchema };
