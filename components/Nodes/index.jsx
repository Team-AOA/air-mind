import React, { useState } from 'react';

import getWindowDimensions from '../../utils/getWindowDemensions';
import Node from '../Node';
import NodeChildren from '../NodeChildren';

export default function Nodes() {
  const { width: windowWidth, height: windowHeight } = getWindowDimensions();

  const [headNodePosition, setHeadNodePosition] = useState({
    x: windowWidth / 2 - 75,
    y: windowHeight / 2 - 100,
    width: 130,
    height: 50,
  });

  return (
    <>
      <Node
        x={headNodePosition.x}
        y={headNodePosition.y}
        width={headNodePosition.width}
        height={headNodePosition.height}
        position={headNodePosition}
        setPosition={setHeadNodePosition}
      />
      <NodeChildren parentNodePosition={headNodePosition} />
    </>
  );
}
