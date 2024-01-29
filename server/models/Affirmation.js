const { Schema, model } = require('mongoose');

// Schema for an affirmation
const affirmationSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  emotion: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

// Create the model from the schema
const Affirmation = model('Affirmation', affirmationSchema);

module.exports = Affirmation;
