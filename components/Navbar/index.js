import React from "react";
import styled from "styled-components";

import Button from "../shared/Button";

export default function NavBar() {
  return (
    <NavBarWrapper>
      <Button>CreateButton</Button>
      <Button>PublicButton</Button>
      <Button>YourWorkButton</Button>
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
