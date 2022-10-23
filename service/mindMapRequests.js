import API from '../network/http';

export async function getMindMapData(userId, mindMapId) {
  return API({
    method: 'get',
    url: `/users/${userId}/mind-maps/${mindMapId}`,
  });
}

export async function postMindMapData(userId) {
  return API({
    method: 'post',
    url: `/users/${userId}/mind-maps/`,
  });
}

export async function updateMindMapData(userId, mindMapId, mindMapData) {
  return API({
    method: 'put',
    url: `/users/${userId}/mind-maps/${mindMapId}`,
    data: mindMapData,
  });
}

export default async function getPublicMindMapData() {
  return API({
    method: 'get',
    url: '/mind-maps',
    params: { access: 'public', max: 15 },
  });
}

export async function getMyMindMapData() {
  return API({
    method: 'get',
    url: `/users/634ed0872b20f15c36b9a029/mind-maps`,
    params: { access: 'public', max: 15 },
  });
}

export async function createMindMapData(userId) {
  return API({
    method: 'post',
    url: `/users/${userId}/mind-maps`,
  });
}

export async function deleteMindMapData(userId, mindMapId) {
  return API({
    method: 'delete',
    url: `/users/${userId}/mind-maps/${mindMapId}`,
  });
}
