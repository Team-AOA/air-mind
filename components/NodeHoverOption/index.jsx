import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  BiCommentDetail as CommentIcon,
  BiPlusMedical as PlusIcon,
} from 'react-icons/bi';
import { RiDeleteBin6Line as RecycleBinIcon } from 'react-icons/ri';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isOpenNodeCommentModal } from '../../store/states';
import NODE_COLOR from '../../constants/nodeColor';
import flexCenter from '../shared/FlexCenterContainer';

export default function NodeHoverOption({
  x,
  y,
  setIsOptionMode,
  selectedColor,
  nodeId,
  setNodeData,
}) {
  const [isSelectColorMode, setIsSelectColorMode] = useState(false);
  const setNodeCommentMode = useSetRecoilState(isOpenNodeCommentModal);
  const isOpenCommentMenu = useRecoilValue(isOpenNodeCommentModal);

  const onClickColorPalette = item => {
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };
      tempSel.attribute = {
        ...tempSel.attribute,
        color: item,
      };
      temp[nodeId] = tempSel;
      return temp;
    });
    setIsSelectColorMode(prev => !prev);
  };

  const createNode = () => {};

  const deleteNode = () => {};

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
          <Icon onClick={createNode}>
            <PlusIcon size="24" className="icon" />
          </Icon>
          <Icon onClick={() => setNodeCommentMode(!isOpenCommentMenu)}>
            <CommentIcon size="24" className="icon" />
          </Icon>
          <Icon className="rightIcon" onClick={deleteNode}>
            <RecycleBinIcon size="24" className="icon" />
          </Icon>
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
  justify-content: center;
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
  border-right: 1px solid #e6e6e6;
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
  setNodeData: PropTypes.func.isRequired,
};
