// ============================================ ФУНКЦІЯ, ЩО СТВОРЮЄ КУР'ЄРА ================================================
import axios from 'axios';

export async function getArticles(query, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const url = BASE_URL;

  const params = {
    key: '43041849-c8f652645a26d9036757deffe',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  };

  const res = await axios.get(url, { params });
  return res.data;
}
