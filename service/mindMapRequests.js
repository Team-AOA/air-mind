import axiosNode from '../network/http';

export async function getMindMapData(userId, mindMapId) {
  return axiosNode({
    method: 'get',
    url: `/users/${userId}/mind-maps/${mindMapId}`,
  });
}

export async function postMindMapData(userId) {
  return axiosNode({
    method: 'post',
    url: `/users/${userId}/mind-maps/`,
  });
}
