import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Header from '../Header';
import NodeComment from '../NodeComment';
import { getNodesData } from '../../utils/api/nodeRequests';
import { errorInfo, mindMapInfo, nodesInfo } from '../../store/states';

const NodeCanvas = dynamic(() => import('../NodeCanvas'), {
  ssr: false,
});

export default function MindMap() {
  const setNodeData = useSetRecoilState(nodesInfo);
  const mindMapData = useRecoilValue(mindMapInfo);
  const setError = useSetRecoilState(errorInfo);
  const router = useRouter();

  const [isOpenCommentModal, setIsOpenCommentModal] = useState(true);

  useEffect(() => {
    const pageLoader = async () => {
      try {
        const response = await getNodesData(
          mindMapData.author || '123',
          mindMapData.id || '456',
          mindMapData.headNode || '634e4e47475c008330626937',
          50,
        );

        if (response.result === 'ok') {
          setNodeData(response.node);
        } else if (response.result === 'error') {
          setError(response.error);
          router('/error');
        }
      } catch (error) {
        error.message = `Error in MindMap component : ${error.message}`;

        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }

        setError(error);
        router.push('/error');
      }
    };
    pageLoader();
  }, []);

  return (
    <Wrapper>
      <Header />
      {isOpenCommentModal && (
        <NodeComment closeComment={() => setIsOpenCommentModal(false)} />
      )}
      <NodeCanvas
        headNode={
          mindMapData.headNode?.toString() || '634e4e47475c008330626937'
        }
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
