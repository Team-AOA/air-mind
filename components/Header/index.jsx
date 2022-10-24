import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { getCookie, deleteCookie } from 'cookies-next';
import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserInfo } from '../../store/states';
import { logOut } from '../../service/auth';
import { HeaderButton } from '../shared/Button';
import ProfileIcon from '../shared/ProfileIcon';
import MindMapInfo from '../MindMapInfo';

export default function Header({ loginData }) {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(currentUserInfo);
  const userInfo = useRecoilValue(currentUserInfo);
  const { mindMapId } = router.query;

  useEffect(() => {
    if (loginData !== 'notAuth' && !userInfo.username) {
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

    if (userInfo.username && loginData === 'notAuth') {
      setUserInfo({});
    }

    const loginDate = getCookie('loginTime');
    const currentDate = new Date();

    if (currentDate - loginDate >= 3600000) {
      deleteCookie('loginData');
      deleteCookie('loginData-id');
      deleteCookie('loginTime');
      setUserInfo({});

      alert('Your certification has expired. Please log in again.');
    }
  }, []);

  const clickLogOutHandler = () => {
    logOut();
    deleteCookie('loginData');
    deleteCookie('loginData-id');
    deleteCookie('loginTime');
    setUserInfo({});
    return router.push('/');
  };

  return (
    <HeaderWrapper>
      <HeaderLeftSide>
        <Link href="/">
          <div>
            <Image
              src="/images/air_mind_logo.png"
              width="80px"
              height="80px"
              className="homeIcon"
            />
          </div>
        </Link>
        <Link href="/">
          <div>
            <HeaderHomeButton>air-mind</HeaderHomeButton>
          </div>
        </Link>
      </HeaderLeftSide>
      {mindMapId && <MindMapInfo mindMapId={mindMapId} />}
      {loginData === 'notAuth' ? (
        <HeaderRightSide>
          <HeaderLoginButton onClick={() => router.push('login')}>
            Log In
          </HeaderLoginButton>
          <ProfileIcon src={userInfo.profile || 'guest'} alt="profile" />
        </HeaderRightSide>
      ) : (
        <HeaderRightSide>
          <HeaderMyWorkButton onClick={() => router.push('mind-map')}>
            My Work
          </HeaderMyWorkButton>
          <HeaderLoginButton onClick={clickLogOutHandler}>
            LogOut
          </HeaderLoginButton>
          <ProfileIcon src={userInfo.profile || 'guest'} alt="profile" />
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
  margin-right: 30px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 10;
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
  margin-right: 15px;
  &:hover {
    color: #fab004;
  }
`;
Header.propTypes = {
  loginData: PropTypes.node.isRequired,
};
