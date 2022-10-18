import React from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import styled from 'styled-components';
import { HeaderButton } from '../shared/Button';
import MindMapInfo from '../MindMapInfo';

export default function Header() {
  const router = useRouter();

  return (
    <HeaderWrapper>
      <Image src="/images/air_mind_logo.png" width="80px" height="80px" />
      <HeaderHomeButton>air-mind</HeaderHomeButton>
      <MindMapInfo />
      <HeaderRightSide>
        <HeaderMyWorkButton
          onClick={() => {
            router.push('/my-works');
          }}
        >
          My Work
        </HeaderMyWorkButton>
        <HeaderLoginButton
          onClick={() => {
            router.push('/login');
          }}
        >
          Login
        </HeaderLoginButton>
      </HeaderRightSide>
    </HeaderWrapper>
  );
}

const HeaderRightSide = styled.div`
  width: 40%;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: #2c2c2c;
`;

const HeaderHomeButton = styled(HeaderButton)`
  &:hover {
    color: #e64c82;
  }
`;

const HeaderMyWorkButton = styled(HeaderButton)`
  &:hover {
    color: #82c91e;
  }
`;

const HeaderLoginButton = styled(HeaderButton)`
  &:hover {
    color: #fab004;
  }
`;
