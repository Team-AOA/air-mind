import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import NodeHoverOption from '../NodeHoverOption';
import NodeFoldOption from '../NodeFoldOption';
import NodeFetchButton from '../NodeFetchButton';
import NodeCoworkers from '../NodeCoworkers';
import NODE_COLOR from '../../constants/nodeColor';
import NODE_SIZE from '../../constants/nodeSize';
import setMovePosition from '../../utils/d3/setMovePosition';
import makeAncestors from '../../utils/makeAncestors';
import {
  isOpenNodeOptionModal,
  clickedNodeId,
  currentUserInfo,
  mindMapInfo,
  socketInfo,
} from '../../store/states';

export default function Node({ nodeId, nodeData, setNodeData, socketUsers }) {
  const [isOptionMode, setIsOptionMode] = useState(false);
  const isOpenNodeRightOptionMenu = useRecoilValue(isOpenNodeOptionModal);
  const setNodeRightOptionMode = useSetRecoilState(isOpenNodeOptionModal);
  const setClickedNodeId = useSetRecoilState(clickedNodeId);
  const currentNodeId = useRecoilValue(clickedNodeId);
  const currentUser = useRecoilValue(currentUserInfo);
  const mindMap = useRecoilValue(mindMapInfo);
  const { _id: mindMapId } = mindMap;
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

      if (currentUser && Object.keys(currentUser).length > 0) {
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

  const onClickHandler = e => {
    e.stopPropagation();
    if (!isOpenNodeRightOptionMenu) {
      setNodeRightOptionMode(true);
      setClickedNodeId(nodeId);
      socket.emit(
        'enterNode',
        currentUser,
        makeAncestors(nodeId, nodeData),
        mindMapId,
      );
    } else if (nodeId === currentNodeId) {
      setNodeRightOptionMode(false);
      setClickedNodeId('');
      socket.emit('leaveNode', currentUser, mindMapId);
    } else {
      setClickedNodeId(nodeId);
      socket.emit(
        'enterNode',
        currentUser,
        makeAncestors(nodeId, nodeData),
        mindMapId,
      );
    }
  };

  const hoverHandler = () => {
    setClickedNodeId(nodeId);
    setIsOptionMode(true);
  };

  return (
    <g
      id={`node${nodeId}`}
      ref={groupRef}
      x={nodeX}
      y={nodeY}
      onMouseOver={hoverHandler}
      onMouseOut={() => setIsOptionMode(false)}
      onClick={onClickHandler}
    >
      <RectSvg
        x={nodeX}
        y={nodeY}
        width={nodeWidth}
        height={nodeHeight}
        rx={20}
        selectedColor={nodeColor}
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
        />
      )}
      {node?.children.length > 0 && nodeData[node.children[0]] && (
        <NodeFoldOption x={nodeX} y={nodeY} nodeId={nodeId} isFold={isFold} />
      )}
      {node?.children.length > 0 && !nodeData[node?.children[0]] && (
        <NodeFetchButton x={nodeX} y={nodeY} nodeId={nodeId} />
      )}
      <NodeCoworkers x={nodeX} y={nodeY} socketUsers={socketUsers} />
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
  socketUsers: PropTypes.object.isRequired,
};
