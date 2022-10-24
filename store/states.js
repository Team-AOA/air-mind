import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { recoilPersist } from 'recoil-persist';

const newId = uuidv4();

const { persistAtom } = recoilPersist({});

const userInfo = atom({
  key: `userInfo/${newId}`,
  default: {},
  effects_UNSTABLE: [persistAtom],
});

const currentUserInfo = atom({
  key: 'currentUserInfo',
  default: {},
  effects_UNSTABLE: [persistAtom],
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

const socketInfo = atom({
  key: 'socketInfo',
  default: {},
  dangerouslyAllowMutability: true,
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
  socketInfo,
};
