import axios from 'axios';

const server = 'http://localhost:8000';

export async function getNodesData(userId, mindMapId, nodeId, max = 30) {
  try {
    console.log('req!!');
    const response = await axios({
      method: 'get',
      baseURL: server,
      url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}`,
      params: { max },
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

export async function putNodesData(userId, mindMapId, nodeId, nodeData) {
  try {
    const response = axios({
      method: 'put',
      baseURL: server,
      url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}`,
      data: nodeData,
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
