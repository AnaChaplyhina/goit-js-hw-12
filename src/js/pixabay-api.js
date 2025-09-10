import axios from 'axios';

const API_KEY = 'YOUR_PIXABAY_API_KEY'; // заміни на свій ключ
const BASE_URL = 'https://pixabay.com/api/';

if (!API_KEY || API_KEY === 'YOUR_PIXABAY_API_KEY') {
  throw new Error('Set your Pixabay API key in src/js/pixabay-api.js');
}

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}


