import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin:0;
    padding:0;
    background-color: ${({ theme }) => theme.bg.primary};
    color: ${({ theme }) => theme.text.primary};
  }

`;
