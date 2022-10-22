import React from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { NavBarButton } from '../shared/Button';

export default function NavBar() {
  const router = useRouter();

  return (
    <NavBarContainer>
      <NavBarWrapper>
        <NavBarCreateButton
          onClick={() => {
            router.push('/mind-map/:{nodeId}');
          }}
        >
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
