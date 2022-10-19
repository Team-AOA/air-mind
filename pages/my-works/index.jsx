import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import axios from 'axios';

import { errorInfo, mindMapListInfo } from '../../store/states';

import FAIL_GET_MIND_MAPS from '../../constants/constants';
import MyWorks from '../../components/MyWorks';

export default function MyWorksPage() {
  const [errorMessage, setErrorMessage] = useRecoilState(errorInfo);
  const [mindMapList, setMindMapList] = useRecoilState(mindMapListInfo);

  const getMyWorks = async () => {
    try {
      const data = await axios.get(
        '/users/:userId/mind-maps?access=mixed&max=15',
      );
      setMindMapList(data);
    } catch (error) {
      setErrorMessage(FAIL_GET_MIND_MAPS);
    }
  };

  useEffect(() => {
    getMyWorks();
  }, []);

  return <MyWorks errorMessage={errorMessage} mindMapList={mindMapList} />;
}
