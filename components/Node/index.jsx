import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';

import NodeHoverOption from '../NodeHoverOption';
import NODE_COLOR from '../../constants/nodeColor';
import setMovePosition from '../../utils/d3/setMovePosition';

export default function Node({ selector, x, y, width, height, setNodeData }) {
  console.log('aaa', x, y, width, height);
  const [isOptionMode, setIsOptionMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState(NODE_COLOR.YELLOW);

  useEffect(() => {
    const node = d3.select(`#node${selector}`);
    console.log(node, x, y);

    setMovePosition(node, x, y, selector, setNodeData);
  }, []);

  return (
    <g
      id={`node${selector}`}
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
  selector: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  setNodeData: PropTypes.func.isRequired,
};
