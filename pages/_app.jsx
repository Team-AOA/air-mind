import React from 'react';

import PropTypes from 'prop-types';
import '../styles/globals.css';
import Providers from '../components/DarkMode/Provider';

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />;
    </Providers>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};
