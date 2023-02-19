import React from 'react';

import { DefaultSeo } from 'next-seo';
import { RecoilRoot } from 'recoil';
import PropTypes from 'prop-types';
import GlobalStyle from '../components/shared/globalstyle';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <DefaultSeo
        title="에어마인드"
        description="마인드맵, 협업툴, 회의, 마인드맵 회의, 브레인스토밍, 실시간 회의, 실시간 마인드맵,
        실시간으로 마인드맵을 이용하여 회의를 진행하거나 아이디어를 공유할 수 있습니다."
        canonical="https://aoa.air-mind.live/"
        openGraph={{
          url: 'https://aoa.air-mind.live/',
          title: '에어마인드',
          description:
            '마인드맵, 협업툴, 회의, 마인드맵 회의, 브레인스토밍, 실시간 회의, 실시간 마인드맵,실시간으로 마인드맵을 이용하여 회의를 진행하거나 아이디어를 공유할 수 있습니다.',
          images: [
            {
              url: 'https://kr.object.ncloudstorage.com/air-mind-images/air_mind_logo.png1666976956732.png',
              width: 1200,
              height: 620,
              alt: '에어마인드 아이콘',
            },
          ],
          siteName: '에어마인드',
        }}
      />
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
