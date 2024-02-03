/**
 * This module defines the Mongoose schema and model for orders in the application. Orders represent transactions
 * in which products are purchased, encapsulating information about the purchase date and the products involved.
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
