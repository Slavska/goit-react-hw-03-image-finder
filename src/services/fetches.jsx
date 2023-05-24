import axios from 'axios';

const API_KEY = '35957586-0745b2ddc07475bae1ad912ea';
const BASE_URL = 'https://pixabay.com/api';

export async function fetch(input, page) {
  const items = await axios.get(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${input}&page=${page}&per_page=12&key=${API_KEY}`
  );
  return items.data;
}
