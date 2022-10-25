import React from 'react';
import Image from 'next/image';

import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { currentUserInfo } from '../../store/states';

import { login } from '../../service/auth';
import googleDocsIcon from '../../public/images/btn_google_signin_light_pressed_web@2x.png';
import Header from '../Header';
import flexCenter from '../shared/FlexCenterContainer';

export default function Login() {
  const saveUserData = useSetRecoilState(currentUserInfo);
  const router = useRouter();

  const clickLoginHandler = async () => {
    const response = await login();
    if (!response?.user) {
      return;
    }
    const { _id, username, email, profile } = response.user;
    saveUserData({
      id: _id,
      username,
      email,
      profile,
    });
    if (response.result === 'ok') {
      router.push('/');
    }
  };

  return (
    <Wrapper>
      <Header />
      <IconWrapper>
        <Title>Sign in with</Title>
        <Title>Google</Title>

        <Image
          src={googleDocsIcon}
          alt="google-docs-icon"
          className="googleLoginButton"
          onClick={clickLoginHandler}
          placeholder="empty"
        />
      </IconWrapper>
    </Wrapper>
  );
}

// Login.propTypes = {
//   loginData: PropTypes.node.isRequired,
// };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0;
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: left;
  margin: 0;
`;

const IconWrapper = styled(flexCenter)`
  min-width: 10rem;
  height: 80vh;
  align-items: flex-start;
  transform: translateY(-30px);

  .googleLoginButton {
    width: 100%;
    margin-top: 3rem;
    transition: 0.1s all;
    cursor: pointer;

    &:hover {
      transform: scale(1.02);
    }
  }
`;
