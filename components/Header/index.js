import React from "react";
import styled from "styled-components";

// import LoginButton from "./LoginButton";
// import LogoutButton from "./LogoutButton";
// import MainPageButton from "./MainPageButton";
// import MindMapInfo from "./MindMapInfo";
// import MyWorkButton from "./MyWorkButton";
import Button from "../shared/Button";
import MindMapInfo from "../MindMapInfo";

export default function Header() {
  return (
    <HeaderWrapper>
      <Button>Home</Button>;
      <MindMapInfo />
      <Button>MyWork</Button>
      <Button>Login</Button>
      <Button>Logout</Button>
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
