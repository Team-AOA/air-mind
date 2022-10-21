import axiosNode from '../network/http';

export async function getNodesData(userId, mindMapId, nodeId, max = 30) {
  return axiosNode({
    method: 'get',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}`,
    params: { max },
  });
}

export async function putNodesData(userId, mindMapId, nodeId, nodeData) {
  return axiosNode({
    method: 'put',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}`,
    data: nodeData,
  });
}

export async function getCommentsData(userId, mindMapId, nodeId) {
  return axiosNode({
    method: 'get',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}/comments`,
  });
}

export async function postCommentsData(userId, mindMapId, nodeId, commentData) {
  return axiosNode({
    method: 'get',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}/comments`,
    data: commentData,
  });
}
