const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quote-me-db');

module.exports = mongoose.connection;

/**
 * This module establishes a connection to the MongoDB database using Mongoose, a MongoDB object modeling tool
 * designed to work in an asynchronous environment. The connection URI is determined by the environment variable
 * MONGODB_URI, allowing for flexibility between development, testing, and production environments. If MONGODB_URI
 * is not specified, it defaults to connecting to a local MongoDB instance.
 * 
 * The database targeted is 'quote-me-db', which is intended to store and manage data for the QuoteMe application,
 * such as user profiles, quotes, and any related information.
 */