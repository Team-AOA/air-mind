import axios from 'axios';
import { getCookie } from 'cookies-next';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
});

API.interceptors.request.use(
  req => {
    const loginData = getCookie('loginData');
    if (loginData) {
      req.headers.Authorization = `Bearer ${loginData}`;
    }

    return req;
  },
  error => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  res => {
    if (!res.data) {
      throw new Error('No data transferred');
    }

    return res.data;
  },
  error => {
    const currentError = {
      result: error.response.data.result,
      ...error.response.data.error,
      error,
    };

    console.log('error : ', error);

    if (process.env.NODE_ENV === 'development') {
      console.error(currentError);
    } else {
      console.log({ result: 'error', statusCode: error.response.status });
    }

    throw currentError;
  },
);

export default API;
