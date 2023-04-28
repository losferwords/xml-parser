import axios from 'axios';

const api = axios.create({
  baseURL: window.location.origin,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic QUFJOkFBSQ==',
  },
});

export default api;
