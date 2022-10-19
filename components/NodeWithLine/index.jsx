import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import PropTypes from 'prop-types';
import Node from '../Node';

export default function NodeWithLine({ parentNodeInfo, childNodeInfo }) {
  const lineRef = useRef();

  const [childNodePosition, setChildNodePosition] = useState({
    x: childNodeInfo.x,
    y: childNodeInfo.y,
    width: childNodeInfo.width,
    height: childNodeInfo.height,
  });
  setChildNodePosition(1);

  useEffect(() => {
    const line = d3.select(lineRef.current);
    const parentCenter = [
      parentNodeInfo.x + parentNodeInfo.width / 2,
      parentNodeInfo.y + parentNodeInfo.height / 2,
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
  }, [parentNodeInfo, childNodePosition]);

  return (
    <>
      <line ref={lineRef} style={{ stroke: 'red' }} />
      <Node {...childNodeInfo} />
    </>
  );
}

NodeWithLine.propTypes = {
  parentNodeInfo: PropTypes.object.isRequired,
  childNodeInfo: PropTypes.object.isRequired,
};
