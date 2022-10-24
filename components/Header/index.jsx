import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import styled from 'styled-components';

import { getCookie, deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { logOut } from '../../service/auth';
import { HeaderButton } from '../shared/Button';
import MindMapInfo from '../MindMapInfo';
import { currentUserInfo } from '../../store/states';

export default function Header({ loginData }) {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(currentUserInfo);
  const userInfo = useRecoilValue(currentUserInfo);
  const { mindMapId } = router.query;

  useEffect(() => {
    if (loginData !== 'notAuth' && !userInfo.name) {
      const userData = jwt_decode(loginData);
      const userId = getCookie('loginData-id');

      const { name, email, picture } = userData;

      setUserInfo({
        id: userId,
        username: name,
        email,
        profile: picture,
      });
    }
  }, []);

  console.log(userInfo);

  const clickLogOutHandler = () => {
    logOut();
    deleteCookie('loginData');
    setUserInfo({});
    return router.push('/');
  };

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
      {loginData === 'notAuth' ? (
        <HeaderRightSide>
          <HeaderLoginButton onClick={() => router.push('login')}>
            Log In
          </HeaderLoginButton>
        </HeaderRightSide>
      ) : (
        <HeaderRightSide>
          <HeaderMyWorkButton onClick={() => router.push('mind-map')}>
            My Work
          </HeaderMyWorkButton>
          <HeaderLoginButton onClick={clickLogOutHandler}>
            LogOut
          </HeaderLoginButton>
        </HeaderRightSide>
      )}
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

Header.propTypes = {
  loginData: PropTypes.node.isRequired,
};
