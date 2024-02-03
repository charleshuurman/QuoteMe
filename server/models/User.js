/**
 * This module defines the schema and model for user entities in the application using Mongoose. It captures essential 
 * user information including names, username, email, password, and more. Unique constraints are applied to both 
 * username and email to ensure no duplicates. The schema also includes references to other models such as 'Quote', 
 * 'User' (for friends), and 'Affirmation', and embeds the 'Order' schema directly, demonstrating both referencing and 
 * embedding techniques in document design.
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('../models/Order');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  tier: {
    type: Number
  },
  quotes: [{
    type: Schema.Types.ObjectId,
    ref: 'Quote',
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  savedAffirmations: [{
    type: Schema.Types.ObjectId,
    ref: 'Affirmation'
  }],
  orders: [Order.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
