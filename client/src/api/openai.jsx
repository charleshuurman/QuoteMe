import axios from 'axios';

export const sendUserFeeling = async (feeling) => {
  try {
    const response = await axios.post('http://localhost:3004/api/quotes', { feeling });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};
