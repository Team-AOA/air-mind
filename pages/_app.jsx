import React from 'react';

import { RecoilRoot } from 'recoil';
import PropTypes from 'prop-types';
import GlobalStyle from '../components/shared/GlobalStyle';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};
