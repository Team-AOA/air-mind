import React from 'react';
import dynamic from 'next/dynamic';

import Header from '../Header';
import SearchBar from '../SearchBar';

const NodeContainer = dynamic(() => import('../NodeContainer'), {
  ssr: false,
});

export default function MindMap() {
  return (
    <>
      <Header />
      <SearchBar />
      <NodeContainer />
    </>
  );
}
