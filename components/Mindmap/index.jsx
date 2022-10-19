import React from 'react';
import dynamic from 'next/dynamic';

import Header from '../Header';

const NodeCanvas = dynamic(() => import('../NodeCanvas'), {
  ssr: false,
});

export default function MindMap() {
  return (
    <>
      <Header />
      <NodeCanvas />
    </>
  );
}
