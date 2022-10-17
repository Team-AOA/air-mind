import React from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import Button from '../shared/Button';

export default function NavBar() {
  const router = useRouter();

  return (
    <NavBarWrapper>
      <NavBarButton
        onClick={() => {
          router.push('/mind-map/:{nodeId}');
        }}
      >
        Create
      </NavBarButton>
      <NavBarButton
        onClick={() => {
          router.push('/');
        }}
      >
        Public
      </NavBarButton>
      <NavBarButton
        onClick={() => {
          router.push('/my-works');
        }}
      >
        My Work
      </NavBarButton>
    </NavBarWrapper>
  );
}

const NavBarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  height: 80px;
  width: 90%;
  margin: 30px;
  background-color: white;
  border-bottom: 5px solid royalBlue;
`;

const NavBarButton = styled(Button)`
  background-color: royalBlue
  color: white;
  width: 10rem;
  height: 3rem;
  font-size: 20px;
  margin: 0px;
  &:hover{
    transition: all .3s ease-out;
    background-color: royalBlue;
    color: white;
    transition: 250ms;
}
`;
