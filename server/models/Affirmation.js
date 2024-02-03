/**
 * This module defines the schema and model for "Affirmation" entities using Mongoose. An affirmation
 * in the context of the QuoteMe application is a statement that users can create, associated with a
 * particular emotion. Each affirmation consists of content and an associated emotion, both of which 
 * are required fields. The schema also includes automatic timestamping for creation and update actions.
 */
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
