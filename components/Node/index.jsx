import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';

import NODE_COLOR from '../../constants/nodeColor';
import setMovePosition from '../../utils/d3/setMovePosition';

export default function Node({ x, y, width, height, position, setPosition }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = d3.select(nodeRef.current);

    setMovePosition(node, position, setPosition);
  }, [position, setPosition]);

  return (
    <g ref={nodeRef} x={x} y={y}>
      <RectSvg x={x} y={y} width={width} height={height} rx={30} />
      <text x={x + 50} y={y + 30}>
        title
      </text>
    </g>
  );
}

const RectSvg = styled.rect`
  fill: ${NODE_COLOR.YELLOW};
`;

Node.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  width: PropTypes.node.isRequired,
  height: PropTypes.node.isRequired,
  position: PropTypes.object.isRequired,
  setPosition: PropTypes.func.isRequired,
};
