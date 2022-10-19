import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';

import NodeHoverOption from '../NodeHoverOption';
import NODE_COLOR from '../../constants/nodeColor';
import setMovePosition from '../../utils/d3/setMovePosition';

export default function Node({ x, y, width, height, position, setPosition }) {
  const nodeRef = useRef();
  const [isOptionMode, setIsOptionMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState(NODE_COLOR.YELLOW);

  useEffect(() => {
    const node = d3.select(nodeRef.current);

    setMovePosition(node, position, setPosition);
  }, [position, setPosition]);

  return (
    <g
      ref={nodeRef}
      x={x}
      y={y}
      onMouseOver={() => setIsOptionMode(true)}
      onMouseOut={() => setIsOptionMode(false)}
    >
      <RectSvg
        x={x}
        y={y}
        width={width}
        height={height}
        rx={30}
        selectedColor={selectedColor}
      />
      <text x={x + 50} y={y + 30}>
        title
      </text>
      {isOptionMode && (
        <NodeHoverOption
          x={x}
          y={y}
          setIsOptionMode={setIsOptionMode}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}
    </g>
  );
}

const RectSvg = styled.rect`
  fill: ${props => props.selectedColor};
`;

Node.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  width: PropTypes.node.isRequired,
  height: PropTypes.node.isRequired,
  position: PropTypes.object.isRequired,
  setPosition: PropTypes.func.isRequired,
};
