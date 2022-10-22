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

export default async function getPublicMindMapData() {
  return axiosMindMap({
    method: 'get',
    url: '/mind-maps',
    params: { access: 'public', max: 15 },
  });
}

export async function getMyMindMapData() {
  return axiosMindMap({
    method: 'get',
    url: `/users/634ed0872b20f15c36b9a029/mind-maps`,
    params: { access: 'public', max: 15 },
  });
}

export async function createMindMapData() {
  return axiosMindMap({
    method: 'post',
    url: '/users/634ed0872b20f15c36b9a029/mind-maps',
  });
}

export async function deleteMindMapData() {
  return axiosMindMap({
    method: 'delete',
    url: '/users/634ed0872b20f15c36b9a029/mind-maps/:mindMapId',
  });
}
