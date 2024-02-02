/**
 * This utility file provides functions to interact with external APIs for fetching quotes and images.
 * It uses axios for making HTTP requests to the Quotable API for quotes and the Pixabay API for images.
 * These functions are designed to be reusable throughout the application wherever such data fetching
 * is required.
 */

import axios from 'axios';

const PIXABAY_API_KEY='42063295-6041c1ad4d9e3c810e99bacc1'

const quoteApiSearch = async (query) =>
  axios.get(`https://api.quotable.io/quotes?tags=${query}`);


const searchImage = async (query) =>
  axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&pretty=true`);

export default { quoteApiSearch, searchImage };
