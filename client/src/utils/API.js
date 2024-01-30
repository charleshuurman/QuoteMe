import axios from 'axios';

//import {PIXABAY_API_KEY} from './API_KEY.js';
const PIXABAY_API_KEY='42063295-6041c1ad4d9e3c810e99bacc1'

const quoteApiSearch = async (query) =>
  axios.get(`https://api.quotable.io/quotes?tags=${query}`);


const searchImage = async (query) =>
  axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&pretty=true`);

export default { quoteApiSearch, searchImage };
