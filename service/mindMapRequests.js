import axiosNode, { axiosMindMap } from '../network/http';

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

export default async function getPublicMindMapsData() {
  return axiosMindMap({
    method: 'get',
    url: '/mind-maps',
    params: { access: 'public', max: 15 },
  });
}
