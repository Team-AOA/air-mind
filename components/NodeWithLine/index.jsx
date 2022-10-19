import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import PropTypes from 'prop-types';
import Node from '../Node';

export default function NodeWithLine({
  parentNodePosition,
  // childNodeInitialPosition,
}) {
  const lineRef = useRef();

  const [childNodePosition, setChildNodePosition] = useState({
    x: parentNodePosition.x + 50,
    y: parentNodePosition.y + 100,
    width: parentNodePosition.width,
    height: parentNodePosition.height,
  });

  // const [childNodePosition, setChildNodePosition] = useState({
  //   x: childNodeInitialPosition.x,
  //   y: childNodeInitialPosition.y,
  //   width: childNodeInitialPosition.width,
  //   height: childNodeInitialPosition.height,
  // })

  useEffect(() => {
    const line = d3.select(lineRef.current);
    const parentCenter = [
      parentNodePosition.x + parentNodePosition.width / 2,
      parentNodePosition.y + parentNodePosition.height / 2,
    ];
    const childCenter = [
      childNodePosition.x + childNodePosition.width / 2,
      childNodePosition.y + childNodePosition.height / 2,
    ];
    line
      .attr('x1', parentCenter[0])
      .attr('y1', parentCenter[1])
      .attr('x2', childCenter[0])
      .attr('y2', childCenter[1]);
  }, [parentNodePosition, childNodePosition]);

  return (
    <>
      <line ref={lineRef} style={{ stroke: 'red' }} />
      <Node
        x={childNodePosition.x}
        y={childNodePosition.y}
        width={childNodePosition.width}
        height={childNodePosition.height}
        position={childNodePosition}
        setPosition={setChildNodePosition}
      />
    </>
  );
}

NodeWithLine.propTypes = {
  parentNodePosition: PropTypes.object.isRequired,
};
