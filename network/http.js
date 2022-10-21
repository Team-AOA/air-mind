import axios from 'axios';

const server = 'http://localhost:8000';

export default async function axiosNode(options) {
  try {
    const response = await axios({
      baseURL: server,
      ...options,
    });

    if (!response.data) {
      throw new Error('No data transferred');
    }

    return response.data;
  } catch (error) {
    error.message = `Error during connection to server in nodeRequests.js : ${error.message}`;

    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    return {
      result: 'error',
      error,
    };
  }
}
