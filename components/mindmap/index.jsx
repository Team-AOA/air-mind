import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import receiveSocket from '../../utils/socket/receivesocker';
import preventBodyScrolling from '../../utils/preventbodyscrolling';
import makeSearched from '../../utils/makesearched';
import {
  userInfo,
  errorInfo,
  nodesInfo,
  mindMapInfo,
  isOpenNodeCommentModal,
  isOpenNodeOptionModal,
  clickedImgPath,
  socketInfo,
  socketUserInfo,
  foldLockInfo,
  searchInfo,
} from '../../store/states';
import Header from '../header';
import NodeComment from '../nodecomment';
import NodeDetail from '../nodedetail';
import flexCenter from '../shared/flexcentercontainer';
import pageLoader from '../../utils/pageloader';

const NodeCanvas = dynamic(() => import('../nodecanvas'), {
  ssr: false,
});

export default function MindMap({ mindMapId }) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const [userData, setUserData] = useRecoilState(userInfo);
  const [mindMapData, setMindMapData] = useRecoilState(mindMapInfo);
  const setError = useSetRecoilState(errorInfo);
  const [isOpenNodeCommentMenu, setIsOpenNodeCommentMenu] = useRecoilState(
    isOpenNodeCommentModal,
  );
  const [isOpenNodeOptionMenu, setIsOpenNodeOptionMenu] = useRecoilState(
    isOpenNodeOptionModal,
  );
  const clickedImagePath = useRecoilValue(clickedImgPath);
  const setClickedImagePath = useSetRecoilState(clickedImgPath);
  const [socket, setSocket] = useRecoilState(socketInfo);
  const router = useRouter();
  const setSocketUserData = useSetRecoilState(socketUserInfo);
  const setIsFoldLock = useSetRecoilState(foldLockInfo);
  const [searchKeyword, setSearchKeyword] = useState('');
  const setSearched = useSetRecoilState(searchInfo);

  useEffect(() => {
    setIsOpenNodeCommentMenu(false);
    setIsOpenNodeOptionMenu(false);

    if (!socket || Object.keys(socket).length <= 0) {
      setSocket(
        io(process.env.NEXT_PUBLIC_BASE_URL, {
          transports: ['websocket'],
        }),
      );

      return () => {};
    }

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
      setIsFoldLock,
    );

    return () => {
      socket.emit('leaveMindMap', mindMapId);
      socket.off('broadcast');
      setSocket({});
    };
  }, [socket]);

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

  useEffect(() => {
    if (!searchKeyword) {
      setSearched(new Set());
    }

    setSearched(makeSearched(nodeData, searchKeyword));
  }, [nodeData, searchKeyword]);

  return (
    <Container>
      <Header />
      {isOpenNodeCommentMenu && <NodeComment />}
      {clickedImagePath && (
        <ImageModal onClick={() => setClickedImagePath('')}>
          <img src={clickedImagePath} alt="nodeImage" />
        </ImageModal>
      )}
      <RightMenu>
        <RightMenuContainer>
          <RightMenuWrapper>
            <SearchBar>
              <Image
                src="/images/noun-search-5247523.png"
                width="50px"
                height="50px"
                className="dragIcon"
                onClick={() => {
                  setIsSearchMode(!isSearchMode);
                  setSearchKeyword('');
                }}
              />
              <SearchInput
                searchMode={isSearchMode}
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
              />
            </SearchBar>
            {isOpenNodeOptionMenu && <NodeDetail />}
          </RightMenuWrapper>
        </RightMenuContainer>
      </RightMenu>
      <NodeCanvas headNode={mindMapData?.headNode || ''} />
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

const ImageModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  /* background-color: blue; */
  /* opacity: 30%; */

  img {
    /* width: 100%; */
    height: inherit;
  }
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
