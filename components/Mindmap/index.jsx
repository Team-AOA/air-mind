import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { getNodesData } from '../../utils/api/nodeRequests';
import preventBodyScrolling from '../../utils/preventBodyScrolling';
import {
  errorInfo,
  mindMapInfo,
  nodesInfo,
  isOpenNodeCommentModal,
  isOpenNodeOptionModal,
} from '../../store/states';
import Header from '../Header';
import NodeComment from '../NodeComment';
import NodeDetail from '../NodeDetail';
import flexCenter from '../shared/FlexCenterContainer';

const NodeCanvas = dynamic(() => import('../NodeCanvas'), {
  ssr: false,
});

export default function MindMap() {
  const setNodeData = useSetRecoilState(nodesInfo);
  const mindMapData = useRecoilValue(mindMapInfo);
  const setError = useSetRecoilState(errorInfo);
  const isOpenNodeCommentMenu = useRecoilValue(isOpenNodeCommentModal);
  const isOpenNodeOptionMenu = useRecoilValue(isOpenNodeOptionModal);
  const router = useRouter();

  const [isSearchMode, setIsSearchMode] = useState(false);

  // Todo: search
  // Todo: 모달 클릭
  useEffect(() => {
    preventBodyScrolling();
  }, []);

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
    <Container>
      <Header />
      {isOpenNodeCommentMenu && <NodeComment />}
      <RightMenu>
        <RightMenuContainer>
          <RightMenuWrapper>
            <SearchBar>
              <Image
                src="/images/noun-search-5247523.png"
                width="50px"
                height="50px"
                className="dragIcon"
                onClick={() => setIsSearchMode(!isSearchMode)}
              />
              <SearchInput searchMode={isSearchMode} />
            </SearchBar>
            {isOpenNodeOptionMenu && <NodeDetail />}
          </RightMenuWrapper>
        </RightMenuContainer>
      </RightMenu>
      <NodeCanvas
        headNode={
          mindMapData.headNode?.toString() || '634e4e47475c008330626937'
        }
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  border: 1px solid black;
  overflow: hidden;
`;

const RightMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
`;

const RightMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  position: absolute;

  overflow: hidden;
`;

const RightMenuWrapper = styled(flexCenter)`
  justify-content: flex-start;
  width: 300px;
  height: 100vh;
  z-index: 1000;
`;

const SearchBar = styled.div`
  flex-grow: 0;
  display: flex;
  justify-content: flex-end;
  width: 300px;
  height: 50px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: all 2s;
  cursor: pointer;
`;

const SearchInput = styled.input`
  border: none;
  border-bottom: ${props => (props.searchMode ? '1px solid black' : 'none')};
  width: ${props => (props.searchMode ? '250px' : '-0')};
  transition: all 1.5s ease-in-out;
  background-color: none;
`;
