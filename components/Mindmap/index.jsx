import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import receiveSocket from '../../utils/socket/receiveSocket';
import preventBodyScrolling from '../../utils/preventBodyScrolling';
import {
  userInfo,
  errorInfo,
  nodesInfo,
  mindMapInfo,
  isOpenNodeCommentModal,
  isOpenNodeOptionModal,
  socketInfo,
  socketUserInfo,
  foldLockInfo,
} from '../../store/states';
import Header from '../Header';
import NodeComment from '../NodeComment';
import NodeDetail from '../NodeDetail';
import flexCenter from '../shared/FlexCenterContainer';
import pageLoader from '../../utils/pageLoader';

const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
  transports: [`websocket`],
});

const NodeCanvas = dynamic(() => import('../NodeCanvas'), {
  ssr: false,
});

export default function MindMap({ mindMapId }) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const setNodeData = useSetRecoilState(nodesInfo);
  const [userData, setUserData] = useRecoilState(userInfo);
  const [mindMapData, setMindMapData] = useRecoilState(mindMapInfo);
  const setError = useSetRecoilState(errorInfo);
  const isOpenNodeCommentMenu = useRecoilValue(isOpenNodeCommentModal);
  const isOpenNodeOptionMenu = useRecoilValue(isOpenNodeOptionModal);
  const setSocket = useSetRecoilState(socketInfo);
  const router = useRouter();
  const setSocketUserData = useSetRecoilState(socketUserInfo);
  const isFoldLock = useRecoilValue(foldLockInfo);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(' client socket connected');
    });

    socket.emit('joinMindMap', mindMapId);

    setSocket(socket);
    receiveSocket(
      socket,
      setNodeData,
      setMindMapData,
      router,
      setSocketUserData,
      isFoldLock,
    );

    return () => {
      socket.emit('leaveMindMap', mindMapId);
      socket.off('broadcast');
      setSocket({});
    };
  }, []);

  useEffect(() => {
    return preventBodyScrolling();
  }, []);

  useEffect(() => {
    if (mindMapId) {
      pageLoader(
        userData,
        setUserData,
        mindMapData,
        setMindMapData,
        setNodeData,
        setError,
        router,
        mindMapId,
      );
    }
  }, [mindMapId]);

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
      <NodeCanvas headNode={mindMapData?.headNode} />
    </Container>
  );
}

MindMap.propTypes = {
  mindMapId: PropTypes.string.isRequired,
};

const Container = styled.div`
  height: 100vh;
  border: 1px solid black;
`;

const RightMenu = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RightMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  position: absolute;
`;

const RightMenuWrapper = styled(flexCenter)`
  justify-content: flex-start;
  width: 300px;
  /* height: 100vh; */

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
