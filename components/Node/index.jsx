import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import NodeHoverOption from '../NodeHoverOption';
import NODE_COLOR from '../../constants/nodeColor';
import NODE_SIZE from '../../constants/nodeSize';
import setMovePosition from '../../utils/d3/setMovePosition';
import { isOpenNodeOptionModal, clickedNodeId } from '../../store/states';

export default function Node({ nodeData, setNodeData }) {
  const [isOptionMode, setIsOptionMode] = useState(false);
  const isOpenNodeRightOptionMenu = useRecoilValue(isOpenNodeOptionModal);
  const setNodeRightOptionMode = useSetRecoilState(isOpenNodeOptionModal);
  const setClickedNodeId = useSetRecoilState(clickedNodeId);

  const groupRef = useRef();
  const textRef = useRef();
  let nodeId;
  let nodeAttribute;
  let nodeTitle;
  let nodeX;
  let nodeY;
  let nodeWidth;
  let nodeHeight;
  let nodeColor;
  let textX;
  let textY;

  if (nodeData && Object.keys(nodeData)?.length > 0) {
    ({ _id: nodeId, attribute: nodeAttribute, title: nodeTitle } = nodeData);
    ({ cordX: nodeX, cordY: nodeY } = nodeAttribute);
    ({ width: nodeWidth, height: nodeHeight } = NODE_SIZE[nodeAttribute.size]);
    nodeColor = NODE_COLOR[nodeAttribute.color];

    const textRect = textRef.current?.getBoundingClientRect();
    textX = textRef.current ? nodeX + (nodeWidth - textRect.width) / 2 : nodeX;
    textY = textRef.current
      ? nodeY + nodeHeight - (nodeHeight - (textRect.height - 5)) / 2
      : nodeY;
  }

  useEffect(() => {
    if (nodeData && Object.keys(nodeData)?.length > 0) {
      const node = d3.select(groupRef.current);

      setMovePosition(node, nodeX, nodeY, nodeId, setNodeData);
    }
  }, [nodeData]);

  const onClickHandler = () => {
    setNodeRightOptionMode(!isOpenNodeRightOptionMenu);
    setClickedNodeId(nodeId);
  };

  return (
    <g
      ref={groupRef}
      x={nodeX}
      y={nodeY}
      onMouseOver={() => setIsOptionMode(true)}
      onMouseOut={() => setIsOptionMode(false)}
    >
      <RectSvg
        x={nodeX}
        y={nodeY}
        width={nodeWidth}
        height={nodeHeight}
        rx={20}
        selectedColor={nodeColor}
        onClick={onClickHandler}
      />
      <text ref={textRef} x={textX} y={textY}>
        {nodeTitle}
      </text>
      {isOptionMode && (
        <NodeHoverOption
          x={nodeX}
          y={nodeY}
          setIsOptionMode={setIsOptionMode}
          selectedColor={nodeColor}
          nodeId={nodeId}
          setNodeData={setNodeData}
        />
      )}
    </g>
  );
}

const RectSvg = styled.rect`
  fill: ${props => props.selectedColor};
`;

Node.propTypes = {
  nodeData: PropTypes.object,
  setNodeData: PropTypes.func.isRequired,
};

Node.defaultProps = {
  nodeData: {},
};
