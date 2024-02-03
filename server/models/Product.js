/**
 * This module defines the Mongoose schema and model for products within the application. Products are central to the
 * application's offerings, whether it's an e-commerce platform, a service catalog, or any system that involves item
 * transactions. The schema captures essential details of products, including their name, description, image, pricing,
 * available quantity, and associated category.
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
