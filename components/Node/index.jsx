import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import NodeHoverOption from '../NodeHoverOption';
import NodeFoldOption from '../NodeFoldOption';
import NODE_COLOR from '../../constants/nodeColor';
import NODE_SIZE from '../../constants/nodeSize';
import setMovePosition from '../../utils/d3/setMovePosition';
import {
  isOpenNodeOptionModal,
  clickedNodeId,
  mindMapInfo,
  socketInfo,
} from '../../store/states';

export default function Node({ nodeId, nodeData, setNodeData }) {
  const [isOptionMode, setIsOptionMode] = useState(false);
  const isOpenNodeRightOptionMenu = useRecoilValue(isOpenNodeOptionModal);
  const setNodeRightOptionMode = useSetRecoilState(isOpenNodeOptionModal);
  const setClickedNodeId = useSetRecoilState(clickedNodeId);
  const currentNodeId = useRecoilValue(clickedNodeId);
  const mindMap = useRecoilValue(mindMapInfo);
  const [textX, setTextX] = useState();
  const [textY, setTextY] = useState();
  const socket = useRecoilValue(socketInfo);

  const groupRef = useRef();
  const textRef = useRef();
  const node = nodeData[nodeId];

  let nodeAttribute;
  let nodeTitle;
  let nodeX;
  let nodeY;
  let nodeWidth;
  let nodeHeight;
  let nodeColor;
  let isFold;

  if (node && Object.keys(node)?.length > 0) {
    ({ attribute: nodeAttribute, title: nodeTitle } = node);
    ({ cordX: nodeX, cordY: nodeY, isFold } = nodeAttribute);
    ({ width: nodeWidth, height: nodeHeight } = NODE_SIZE[nodeAttribute.size]);
    nodeColor = NODE_COLOR[nodeAttribute.color];
  }

  useEffect(() => {
    if (node && Object.keys(node)?.length > 0) {
      const nodeSelected = d3.select(groupRef.current);

      setMovePosition(
        nodeSelected,
        nodeX,
        nodeY,
        nodeId,
        nodeData,
        setNodeData,
        mindMap,
        socket,
      );
    }
  }, [node]);

  useEffect(() => {
    const textRect = textRef.current?.getBoundingClientRect();
    setTextX(
      textRef.current ? nodeX + (nodeWidth - textRect.width) / 2 : nodeX,
    );
    setTextY(
      textRef.current
        ? nodeY + nodeHeight - (nodeHeight - (textRect.height - 5)) / 2
        : nodeY,
    );
  }, [node]);

  const onClickHandler = () => {
    if (nodeId === currentNodeId || !isOpenNodeRightOptionMenu) {
      setNodeRightOptionMode(!isOpenNodeRightOptionMenu);
    }

    setClickedNodeId(nodeId);
  };

  return (
    <g
      id={`node${nodeId}`}
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
      <text ref={textRef} x={textX} y={textY} onClick={onClickHandler}>
        {nodeTitle}
      </text>
      {isOptionMode && (
        <NodeHoverOption
          x={nodeX}
          y={nodeY}
          setIsOptionMode={setIsOptionMode}
          selectedColor={nodeColor}
          nodeId={nodeId}
        />
      )}
      {node?.children.length > 0 && nodeData[node.children[0]] && (
        <NodeFoldOption x={nodeX} y={nodeY} nodeId={nodeId} isFold={isFold} />
      )}
    </g>
  );
}

const RectSvg = styled.rect`
  fill: ${props => props.selectedColor};
`;

Node.propTypes = {
  nodeId: PropTypes.string.isRequired,
  nodeData: PropTypes.object.isRequired,
  setNodeData: PropTypes.func.isRequired,
};
