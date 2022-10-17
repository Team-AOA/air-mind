import React from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import Button from '../shared/Button';
import MindMapInfo from '../MindMapInfo';
import GlobalStyle from '../shared/GlobalStyle';

export default function Header() {
  const darkMode = useDarkMode(true);

  const router = useRouter();
  return (
    <HeaderWrapper>
      <GlobalStyle />
      <Image src="/images/air_mind_logo.png" width="80px" height="80px" />
      <HeaderButton onClick={darkMode.toggle}>air-mind</HeaderButton>
      <MindMapInfo />
      <HeaderRightSide>
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
      </HeaderRightSide>
    </HeaderWrapper>
  );
}

const HeaderRightSide = styled.div`
  width: 40%;
`;

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.text.primary};
`;

const HeaderButton = styled(Button)`
  border: none;
  cursor: pointer;
  width: 8rem;
  height: 3rem;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  margin: 0;
  background-color: ${({ theme }) => theme.text.primary};
  color: ${({ theme }) => theme.bg.primary};
`;
