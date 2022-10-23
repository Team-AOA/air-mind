import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { getCookie, deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { logOut } from '../../service/auth';
import { HeaderButton } from '../shared/Button';
import MindMapInfo from '../MindMapInfo';
import { userInfo } from '../../store/states';

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const deleteUserInfo = useSetRecoilState(userInfo);
  const { mindMapId } = router.query;

  useEffect(() => {
    setToken(getCookie('loginData'));
  }, [token]);

  const clickLogOutHandler = () => {
    logOut();
    deleteCookie('loginData');
    setToken('');
    deleteUserInfo({});
    return router.push('/');
  };

  if (token) {
    return (
      <HeaderWrapper>
        <HeaderLeftSide
          onClick={() => {
            router.push('/');
          }}
        >
          <Image
            className="homeIcon"
            src="/images/air_mind_logo.png"
            width="80px"
            height="80px"
          />
          <HeaderHomeButton>air-mind</HeaderHomeButton>
        </HeaderLeftSide>
        <HeaderRightSide>
          <HeaderMyWorkButton onClick={() => router.push('mind-map')}>
            My Work
          </HeaderMyWorkButton>
          <HeaderLoginButton onClick={clickLogOutHandler}>
            LogOut
          </HeaderLoginButton>
        </HeaderRightSide>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper>
      <HeaderLeftSide>
        <Link href="/">
          <Image src="/images/air_mind_logo.png" width="80px" height="80px" />
        </Link>
        <Link href="/">
          <HeaderHomeButton>air-mind</HeaderHomeButton>
        </Link>
      </HeaderLeftSide>
      {mindMapId && <MindMapInfo mindMapId={mindMapId} />}
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

const HeaderLeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
  margin-left: 10px;

  .homeIcon {
    cursor: pointer;
  }
`;

const HeaderRightSide = styled.div`
  display: flex;
  margin-left: auto;
  width: 20%;
  margin-right: 10px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 1;
  height: 100px;
  width: 100%;
  padding: 0 10px;
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
