import { atom } from 'recoil';

const userInfo = atom({
  key: 'currentUserInfo',
  default: { userId: '634ed0452b20f15c36b9a028' },
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

const clickedNodeId = atom({
  key: 'clickedNodeId',
  default: '',
});

export {
  userInfo,
  errorInfo,
  mindMapInfo,
  mindMapListInfo,
  nodesInfo,
  isOpenNodeCommentModal,
  isOpenNodeOptionModal,
  clickedNodeId,
};
