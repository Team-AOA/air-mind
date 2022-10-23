import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import {
  clickedNodeId,
  isOpenNodeOptionModal,
  mindMapInfo,
  nodesInfo,
  userInfo,
} from '../../store/states';
import flexCenter from '../shared/FlexCenterContainer';
import debounce from '../../utils/debounce';
import { putNodesData } from '../../service/nodeRequests';

export default function NodeDetail() {
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const userData = useRecoilValue(userInfo);
  const mindMapData = useRecoilValue(mindMapInfo);
  const nodeId = useRecoilValue(clickedNodeId);
  const isOpenNodeRightOptionMenu = useRecoilValue(isOpenNodeOptionModal);
  const setNodeRightOptionMode = useSetRecoilState(isOpenNodeOptionModal);

  const { _id: userId } = userData;
  const { _id: mindMapId } = mindMapData;

  const writeTitleHandler = e => {
    const tempData = { ...nodeData };
    tempData[nodeId] = { ...tempData[nodeId], title: e.target.value };
    setNodeData(tempData);

    debounce(() => {
      putNodesData(userId, mindMapId, nodeId, tempData[nodeId]);
    }, 1500);
  };

  const writeDescriptionHandler = e => {
    const tempData = { ...nodeData };
    tempData[nodeId] = { ...tempData[nodeId], content: e.target.value };
    setNodeData(tempData);

    debounce(() => {
      putNodesData(userId, mindMapId, nodeId, tempData[nodeId]);
    }, 1500);
  };

  return (
    <Wrapper isOpen={isOpenNodeRightOptionMenu}>
      <MenuBody className="closeButton">
        <Image
          src="/images/fast-forward.png"
          width="20px"
          height="20px"
          className="closeIcon"
          onClick={() => setNodeRightOptionMode(false)}
        />
      </MenuBody>
      <MenuBody className="title">
        <MenuTitle>Title</MenuTitle>
        <TitleInput
          value={nodeData[nodeId]?.title}
          onChange={writeTitleHandler}
        />
      </MenuBody>
      <MenuBody className="memo">
        <MenuTitle>Description</MenuTitle>
        <MemoTextArea
          value={nodeData[nodeId]?.content}
          onChange={writeDescriptionHandler}
        />
      </MenuBody>
      <MenuBody className="image">
        <MenuTitle>Image</MenuTitle>
        <ImageDropArea>
          <Image
            src="/images/noun-drag-and-drop-4076502.png"
            width="100px"
            height="40px"
            className="dragIcon"
          />
        </ImageDropArea>
      </MenuBody>
      <MenuBody />
    </Wrapper>
  );
}

const Wrapper = styled(flexCenter)`
  flex-grow: 1;
  width: 100%;
  min-height: 500px;
  z-index: 100;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.7);
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(400px)')};
  transition: all 0.6s ease-in-out;

  .closeButton {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-grow: 0;
    min-height: 30px;
    max-height: 30px;
    cursor: pointer;
  }

  .closeIcon:hover {
    border-bottom: 1px solid black;
  }

  .title {
    justify-content: space-between;
    flex-grow: 0;
    min-height: 100px;
    max-height: 100px;
  }

  .memo {
    flex-grow: 0;
    min-height: 200px;
  }

  .image {
    max-height: 150px;
  }
`;

const MenuTitle = styled.div`
  width: 100%;
  margin: 10px 0 0 10px;
  font-size: 15px;
`;

const TitleInput = styled.input`
  width: 90%;
  height: 50px;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  margin: 10px 0;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const MemoTextArea = styled.textarea`
  margin: 10px 0;
  width: 90%;
  height: 90%;
  max-height: 500px;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  resize: none;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const ImageDropArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  position: relative;
  width: 90%;
  height: 90%;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    background-color: #d1ecfe;
  }

  .dragIcon {
    position: absolute;
  }
`;

const MenuBody = styled(flexCenter)`
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
  min-height: 150px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
