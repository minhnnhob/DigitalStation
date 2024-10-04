import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadFiles = (url, formData) => {
  return api.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Ensure this header is set for file uploads
    },
  });
};

export default api;
