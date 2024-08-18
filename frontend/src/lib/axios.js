import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tên-miền-nào-đó.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });