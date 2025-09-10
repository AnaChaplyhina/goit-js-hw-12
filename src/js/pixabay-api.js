import axios from 'axios';

// Можеш лишити напряму в коді:
const API_KEY = '11281296-1f4fc3f6c48856d743f19a161';
// або, якщо колись винесеш у .env.local: const API_KEY = import.meta.env.VITE_PIXABAY_KEY;

const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  const { data } = await axios.get(BASE_URL, { params });
  return data;
}




