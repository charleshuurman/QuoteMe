const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Order = require('./Order');
const Quote = require('./Quote');
const Affirmation = require('./Affirmation');

module.exports = { User, Product, Category, Order, Quote, Affirmation };

/**
 * This module serves as a central aggregator for all Mongoose models used in the application. It imports
 * each model defined in separate files within the models directory and exports them as a single object.
 * This approach simplifies the import process of these models in other parts of the application, allowing
 * for cleaner code and easier maintenance.
 */