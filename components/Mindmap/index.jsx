import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { getNodesData } from '../../service/nodeRequests';
import {
  createMindMapData,
  getMindMapData,
} from '../../service/mindMapRequests';
import preventBodyScrolling from '../../utils/preventBodyScrolling';
import {
  userInfo,
  errorInfo,
  nodesInfo,
  mindMapInfo,
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

export default function MindMap({ mindMapId }) {
  const setNodeData = useSetRecoilState(nodesInfo);
  const userData = useRecoilValue(userInfo);
  const setError = useSetRecoilState(errorInfo);
  const [mindMapData, setMindMapData] = useRecoilState(mindMapInfo);
  const isOpenNodeCommentMenu = useRecoilValue(isOpenNodeCommentModal);
  const isOpenNodeOptionMenu = useRecoilValue(isOpenNodeOptionModal);
  const router = useRouter();

  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    return preventBodyScrolling();
  }, []);

  useEffect(() => {
    const pageLoader = async () => {
      try {
        let userId;
        if (userData && Object.keys(userData).length > 0) {
          ({ _id: userId } = userData);
        } else {
          userId = 'anonymous';
        }

        let headNodeId;
        if (mindMapData && Object.keys(mindMapData).length > 0) {
          headNodeId = mindMapData.headNode;
        } else {
          const responseGetMindMap = await getMindMapData(userId, mindMapId);
          if (responseGetMindMap.result === 'error') {
            throw responseGetMindMap.error;
          }

          headNodeId = responseGetMindMap.mindMap.headNode;
          setMindMapData(responseGetMindMap.mindMap);
        }

        const responseNodes = await getNodesData(
          userId,
          mindMapId,
          headNodeId,
          50,
        );
        if (responseNodes.result === 'error') {
          throw responseNodes.error;
        }

        setNodeData(responseNodes.node);
      } catch (error) {
        error.message = `Error in MindMap component : ${error.message}`;

        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }

        setError(error);
        router.push('/error');
      }
    };
    if (mindMapId) {
      pageLoader();
    }
  }, [mindMapId]);

  useEffect(() => {
    const createMindMap = async () => {
      try {
        const mindMap = await createMindMapData();

        setMindMapData(mindMap);
      } catch (error) {
        setError(error);
      }
    };
    createMindMap();
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
      <NodeCanvas headNode={mindMapData.headNode} />
    </Container>
  );
}

MindMap.propTypes = {
  mindMapId: PropTypes.string.isRequired,
};

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
  cursor: pointer;
`;

const SearchInput = styled.input`
  border: none;
  border-bottom: ${props => (props.searchMode ? '1px solid black' : 'none')};
  width: ${props => (props.searchMode ? '250px' : '-0')};
  transition: all 1.5s ease-in-out;
  background-color: none;
`;
