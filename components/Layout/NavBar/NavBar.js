import React from "react";

import styled from "styled-components";

import CreateButton from "./CreateButton";
import PublicButton from "./PublicButton";
import YourWorkButton from "./YourWorkButton";

export default function NavBar() {
  return (
    <NavBarWrapper>
      <CreateButton />
      <PublicButton />
      <YourWorkButton />
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
  background-color: royalBlue;
`;
