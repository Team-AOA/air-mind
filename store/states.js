import { atom } from 'recoil';

const userInfo = atom({
  key: 'currentUserInfo',
  default: {
    _id: '634ed0452b20f15c36b9a028',
    userName: '최재혁',
    mindMapList: [],
  },
});

const errorInfo = atom({
  key: 'errorInfo',
  default: '',
});

const mindMapInfo = atom({
  key: 'mindMapInfo',
  default: {
    access: '',
  },
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
