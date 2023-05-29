import { atom } from 'recoil';

const userInfo = atom({
  key: 'userInfo',
  default: {},
});

const currentUserInfo = atom({
  key: 'currentUserInfo',
  default: {},
});

const errorInfo = atom({
  key: 'errorInfo',
  default: '',
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

const isOpenNodeCommentModal = atom({
  key: 'isOpenNodeCommentModal',
  default: false,
});

const isOpenNodeOptionModal = atom({
  key: 'isOpenNodeOptionModal',
  default: false,
});

const clickedImgPath = atom({
  key: 'clickedImgPath',
  default: '',
});

const clickedNodeId = atom({
  key: 'clickedNodeId',
  default: '',
});

const deleteInfo = atom({
  key: 'deleteInfo',
  default: false,
});

const socketUserInfo = atom({
  key: 'socketUserInfo',
  default: {},
});

const foldLockInfo = atom({
  key: 'foldLockInfo',
  default: true,
});

const searchInfo = atom({
  key: 'searchInfo',
  default: new Set(),
});

export {
  currentUserInfo,
  userInfo,
  errorInfo,
  mindMapInfo,
  mindMapListInfo,
  nodesInfo,
  isOpenNodeCommentModal,
  isOpenNodeOptionModal,
  clickedNodeId,
  deleteInfo,
  socketUserInfo,
  foldLockInfo,
  searchInfo,
  clickedImgPath,
};
