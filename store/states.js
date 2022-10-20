import { atom } from 'recoil';

const currentUserInfo = atom({
  key: 'currentUserInfo',
  default: {},
});

const errorInfo = atom({
  key: 'errorInfo',
  default: {},
});

const mindMapInfo = atom({
  key: 'mindMapInfo',
  default: {},
});

const mindMapListInfo = atom({
  key: 'mindMapListInfo',
  default: [],
});

const nodesInfo = atom({
  key: 'nodesInfo',
  default: {},
});

export { currentUserInfo, errorInfo, mindMapInfo, mindMapListInfo, nodesInfo };
