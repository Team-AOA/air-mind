import React from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import styled from 'styled-components';
import Button from '../shared/Button';
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

const HeaderHomeButton = styled(Button)`
  border: none;
  cursor: pointer;
  width: 8rem;
  height: 3rem;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  margin: 0;
  background-color: #2c2c2c;
  color: #eff0f5;
  &:hover {
    transition: all 0.3s ease-out;
    background-color: #2c2c2c;
    color: #e64c82;
    transition: 250ms;
  }
`;

const HeaderMyWorkButton = styled(Button)`
  border: none;
  cursor: pointer;
  width: 8rem;
  height: 3rem;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  margin: 0;
  background-color: #2c2c2c;
  color: #eff0f5;
  &:hover {
    transition: all 0.3s ease-out;
    color: #82c91e;
    transition: 250ms;
  }
`;

const HeaderLoginButton = styled(Button)`
  border: none;
  cursor: pointer;
  width: 8rem;
  height: 3rem;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  margin: 0;
  background-color: #2c2c2c;
  color: #eff0f5;
  &:hover {
    transition: all 0.3s ease-out;
    color: #fab004;
    transition: 250ms;
  }
`;
