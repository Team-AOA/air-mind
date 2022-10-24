import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const newId = uuidv4();

const currentUserInfo = atom({
  key: 'currentUserInfo',
  default: {},
});

const userInfo = atom({
  key: `userInfo/${newId}`,
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

const clickedNodeId = atom({
  key: 'clickedNodeId',
  default: '',
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
};
