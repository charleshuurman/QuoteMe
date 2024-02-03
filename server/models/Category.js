/**
 * This file defines the Mongoose schema and model for categories within the application. Categories
 * are used to organize and classify various entities, such as products or quotes, into groups for
 * easier management and retrieval.
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
