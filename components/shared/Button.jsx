import styled from 'styled-components';

export const Button = styled.button`
  font: inherit;
  border: 1px solid white;
  color: royalBlue;
  background-color: white;
  cursor: pointer;
`;

export const HeaderButton = styled(Button)`
  border: none;
  cursor: pointer;
  width: 8rem;
  height: 3rem;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  margin: 0;
  background-color: #2c2c2c;
  color: #eff0f5;
  &:hover {
    transition: all 0.3s ease-out;
    background-color: #2c2c2c;
    transition: 250ms;
  }
`;

export const NavBarButton = styled(Button)`
  width: 10rem;
  height: 3rem;
  font-size: 20px;
  color: #2c2c2c;
  margin: 0px;
  &:hover {
    transition: all 0.3s ease-out;
    transition: 250ms;
  }
`;
