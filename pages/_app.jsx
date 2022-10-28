import React from 'react';

import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import PropTypes from 'prop-types';
import GlobalStyle from '../components/shared/globalstyle';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <title>에어마인드</title>
        <meta
          property="keywords"
          content="마인드맵, 협업툴, 회의, 마인드맵 회의, 브레인스토밍, 실시간 회의, 실시간 마인드맵"
        />
        <meta
          property="description"
          content="실시간으로 마인드맵을 이용하여 회의를 진행하거나 아이디어를 공유할 수 있습니다."
        />
      </Head>
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
