import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  BiCommentDetail as CommentIcon,
  BiPlusMedical as PlusIcon,
} from 'react-icons/bi';
import { RiDeleteBin6Line as RecycleBinIcon } from 'react-icons/ri';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import {
  isOpenNodeCommentModal,
  mindMapInfo,
  socketInfo,
  nodesInfo,
} from '../../store/states';
import NODE_COLOR from '../../constants/nodeColor';
import flexCenter from '../shared/FlexCenterContainer';
import calculateNewNodePosition from '../../utils/d3/calculateNewNodePosition';
import deleteNodeHelper from '../../utils/deleteNodeHelper';
import {
  deleteNodesData,
  postNodesData,
  putNodesData,
} from '../../service/nodeRequests';

export default function NodeHoverOption({
  x,
  y,
  setIsOptionMode,
  selectedColor,
  nodeId,
}) {
  const [isSelectColorMode, setIsSelectColorMode] = useState(false);
  const setNodeCommentMode = useSetRecoilState(isOpenNodeCommentModal);
  const isOpenCommentMenu = useRecoilValue(isOpenNodeCommentModal);
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const mindMap = useRecoilValue(mindMapInfo);
  const isHead = nodeData[nodeId]?.parent === undefined;
  const socket = useRecoilValue(socketInfo);

  const { _id: mindMapId } = mindMap;
  const { _id: userId } = mindMap.author;

  const onClickColorPalette = item => {
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.attribute = {
        ...tempSel.attribute,
        color: item,
      };
      temp[nodeId] = tempSel;

      putNodesData(userId, mindMapId, nodeId, temp[nodeId]);

      return temp;
    });

    socket.emit('colorChange', mindMapId, nodeId, item);

    setIsSelectColorMode(prev => !prev);
  };

  const createNode = async (id, headId) => {
    const calculated = calculateNewNodePosition(id, headId);
    const newNode = await postNodesData(userId, mindMapId, nodeId, {
      attribute: calculated,
    });

    setNodeData(prev => {
      const tempData = { ...prev };
      const { _id: newId } = newNode.node;

      const newParent = {
        ...tempData[nodeId],
        children: [...tempData[nodeId].children, newId],
      };
      tempData[nodeId] = newParent;
      tempData[newId] = newNode.node;
      return { ...prev, ...tempData };
    });
  };

  const deleteNode = async () => {
    deleteNodeHelper(nodeId, nodeData, setNodeData);
    await deleteNodesData(userId, mindMapId, nodeId);
  };

  return (
    <foreignObject x={x + 20} y={y - 180} width={125} height={180}>
      <HoverContainer>
        {isSelectColorMode && (
          <ColorPalette>
            {Object.keys(NODE_COLOR).map(item => (
              <ColorButton
                key={item}
                selectedColor={NODE_COLOR[item]}
                onClick={() => onClickColorPalette(item)}
              />
            ))}
          </ColorPalette>
        )}
        <Menu
          onMouseOver={() => setIsOptionMode(true)}
          onMouseOut={() => setIsOptionMode(false)}
        >
          <Icon
            className="leftIcon"
            onClick={() => setIsSelectColorMode(prev => !prev)}
          >
            <ColorButton selectedColor={selectedColor} />
          </Icon>
          <Icon onClick={() => createNode(nodeId, mindMap.headNode)}>
            <PlusIcon size="24" className="icon" />
          </Icon>
          {isHead && (
            <Icon
              className="rightIcon"
              onClick={() => setNodeCommentMode(!isOpenCommentMenu)}
            >
              <CommentIcon size="24" className="icon" />
            </Icon>
          )}
          {!isHead && (
            <>
              <Icon onClick={() => setNodeCommentMode(!isOpenCommentMenu)}>
                <CommentIcon size="24" className="icon" />
              </Icon>
              <Icon className="rightIcon" onClick={deleteNode}>
                <RecycleBinIcon size="24" className="icon" />
              </Icon>
            </>
          )}
        </Menu>
      </HoverContainer>
    </foreignObject>
  );
}

const HoverContainer = styled(flexCenter)`
  position: relative;
  width: 100%;
  height: 100%;
  transition: background-color 0.5s ease;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 120px;
  height: 30px;
  transform: translateY(73px);
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  background-color: white;

  .leftIcon {
    border-radius: 4px 0 0 4px;
  }

  .rightIcon {
    border: none;
    border-radius: 0 4px 4px 0;
  }
`;

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background-color: white;
  transform: translateX(-20px) translateY(16px);
  transition: background-color 0.3s ease;
`;

const ColorButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: ${props => props.selectedColor};
  transition: 100ms linear;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 1px #696969 inset;
    transform: scale(1.1);
  }
`;

const Icon = styled(flexCenter)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dbdbdb;
  }
`;

NodeHoverOption.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  setIsOptionMode: PropTypes.func.isRequired,
  selectedColor: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
};
