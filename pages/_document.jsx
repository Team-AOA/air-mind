import React from 'react';

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,200&family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <title>에어마인드</title>
        <meta
          property="keywords"
          content="마인드맵, 협업툴, 회의, 마인드맵 회의, 브레인스토밍, 실시간 회의, 실시간 마인드맵"
        />
        <meta
          property="description"
          content="실시간으로 마인드맵을 이용하여 회의를 진행하거나 아이디어를 공유할 수 있습니다."
        />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
