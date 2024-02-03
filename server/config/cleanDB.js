/**
 * This module provides a utility function for MongoDB operations that checks for the existence of 
 * a specific collection within the database and drops it if it is found. It is designed to be used 
 * in situations where a fresh start is needed for a collection (e.g., during initialization or testing 
 * processes where a clean state is required).
 */
const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
