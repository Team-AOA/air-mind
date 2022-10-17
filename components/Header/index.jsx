import React from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import Button from '../shared/Button';
import MindMapInfo from '../MindMapInfo';
import GlobalStyle from '../shared/GlobalStyle';

export default function Header() {
  const router = useRouter();

  return (
    <HeaderWrapper>
      <GlobalStyle />
      <HeaderButton
        onClick={() => {
          router.push('/');
        }}
      >
        Home
      </HeaderButton>
      <MindMapInfo />
      <HeaderButton
        onClick={() => {
          router.push('/my-works');
        }}
      >
        My Work
      </HeaderButton>
      <HeaderButton
        onClick={() => {
          router.push('/login');
        }}
      >
        Login
      </HeaderButton>
      <HeaderButton>Logout</HeaderButton>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: royalBlue;
`;

const HeaderButton = styled(Button)`
  border: none;
  color: #2c2c2c;
  cursor: pointer;
  width: 10rem;
  height: 3rem;
  color: white;
  background-color: royalBlue;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
`;
