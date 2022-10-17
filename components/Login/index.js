import React from "react";

import styled from "styled-components";

// import Header from "../Layout/Header/Header";
// import Button from "../Layout/Button";
import Header from "../Header";
import Button from "../shared/Button";

export default function Login() {
  return (
    <Wrapper>
      <Header />
      <Button>구글로그인</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
