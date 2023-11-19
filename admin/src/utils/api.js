import ky from 'ky';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5858/api';

const api = ky.create({
  prefixUrl: API_URL,
});

export default api;
