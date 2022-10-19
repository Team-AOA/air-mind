import { atom } from 'recoil';

const currentUserInfo = atom({
  key: 'currentUserInfo',
  default: {
    id: '',
    userName: '',
    token: '',
  },
});

const errorInfo = atom({
  key: 'errorInfo',
  default: {
    content: 'error 발생',
  },
});

const mindMapListInfo = atom({
  key: 'mindMapList',
  default: [
    { id: 1, title: 'mindMap title' },
    { id: 2, title: 'mindMap title' },
    { id: 3, title: 'mindMap title' },
    { id: 4, title: 'mindMap title' },
    { id: 5, title: 'mindMap title' },
    { id: 6, title: 'mindMap title' },
    { id: 7, title: 'mindMap title' },
    { id: 8, title: 'mindMap title' },
  ],
});

export { currentUserInfo, errorInfo, mindMapListInfo };
