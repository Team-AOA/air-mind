import React from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import Button from '../shared/Button';

export default function NavBar() {
  const router = useRouter();

  return (
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
  );
}

const NavBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  justify-content: start;
  align-items: center;
  top: 100px;
  background-color: white;
  border-bottom: 3px solid #2c2c2c;
  height: 100px;
  width: 90%;
`;

const NavBarCreateButton = styled(Button)`
  width: 10rem;
  height: 3rem;
  font-size: 20px;
  color: #2c2c2c;
  margin: 0px;
  &:hover {
    transition: all 0.3s ease-out;
    color: #e64c82;
    transition: 250ms;
  }
`;

const NavBarPublicButton = styled(Button)`
  width: 10rem;
  height: 3rem;
  font-size: 20px;
  color: #2c2c2c;
  margin: 0px;
  &:hover {
    transition: all 0.3s ease-out;
    color: #82c91e;
    transition: 250ms;
  }
`;

const NavBarMyWorkButton = styled(Button)`
  width: 10rem;
  height: 3rem;
  font-size: 20px;
  color: #2c2c2c;
  margin: 0px;
  &:hover {
    transition: all 0.3s ease-out;
    color: #fab004;
    transition: 250ms;
  }
`;
