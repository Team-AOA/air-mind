import React from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { NavBarButton } from '../shared/Button1';

import { createMindMapData } from '../../service/mindMapRequests1';
import {
  currentUserInfo,
  errorInfo,
  foldLockInfo,
  mindMapInfo,
  userInfo,
} from '../../store/states';

export default function NavBar() {
  const router = useRouter();
  const setError = useSetRecoilState(errorInfo);
  const setUserData = useSetRecoilState(userInfo);
  const setMindMapData = useSetRecoilState(mindMapInfo);
  const currentUser = useRecoilValue(currentUserInfo);
  const setIsFoldLock = useSetRecoilState(foldLockInfo);

  const handleCreateButton = async () => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      try {
        const { _id: userId } = currentUser;
        const data = await createMindMapData(userId);
        const { mindMap } = data;
        const { _id: mindMapId } = mindMap;

        setIsFoldLock(true);
        setUserData(currentUser);
        setMindMapData(mindMap);

        router.push({
          pathname: `/mind-map/${mindMapId}`,
        });
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <NavBarContainer>
      <NavBarWrapper>
        <NavBarCreateButton onClick={handleCreateButton}>
          Create
        </NavBarCreateButton>
        <NavBarPublicButton
          onClick={() => {
            router.push('/');
          }}
        >
          Public
        </NavBarPublicButton>
        <NavBarMyWorkButton
          onClick={() => {
            router.push('/my-works');
          }}
        >
          My Work
        </NavBarMyWorkButton>
      </NavBarWrapper>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
  top: 100px;
  background-color: white;
  height: 80px;
  width: 100%;
`;

const NavBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid #2c2c2c;
  width: 90.5%;
`;

const NavBarCreateButton = styled(NavBarButton)`
  &:hover {
    color: #e64c82;
  }
`;

const NavBarPublicButton = styled(NavBarButton)`
  &:hover {
    color: #82c91e;
  }
`;

const NavBarMyWorkButton = styled(NavBarButton)`
  &:hover {
    color: #fab004;
  }
`;
