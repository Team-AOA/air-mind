import React from 'react';

import Image from 'next/image';
import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import {
  clickedNodeId,
  isOpenNodeOptionModal,
  mindMapInfo,
  nodesInfo,
  currentUserInfo,
  socketInfo,
} from '../../store/states';
import flexCenter from '../shared/FlexCenterContainer';
import NodeImageDropZone from '../NodeImageDropZone';
import debounce from '../../utils/debounce';
import { putNodesData } from '../../service/nodeRequests';

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
  transports: [`websocket`],
});

const SocketEmit = (mindMapId, nodeInfo) => {
  const data = {
    mindMapId,
    title: nodeInfo.title,
    description: nodeInfo.description,
  };

  socket.emit('userSend', JSON.stringify(data));
};

// const SocketEmit = (mindMapId, nodeInfo) => {
//   // 타이틀용, 디스크립션용 분리
//   const data = {
//     mindMapId,
//     title: nodeInfo.title,
//     description: nodeInfo.description,
//   };

//   socket.emit('userSend', JSON.stringify(data));
// };

export default function NodeDetail() {
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const userData = useRecoilValue(currentUserInfo);
  const mindMapData = useRecoilValue(mindMapInfo);
  const nodeId = useRecoilValue(clickedNodeId);
  const socket = useRecoilValue(socketInfo);

  const isOpenNodeRightOptionMenu = useRecoilValue(isOpenNodeOptionModal);
  const setNodeRightOptionMode = useSetRecoilState(isOpenNodeOptionModal);

  const { _id: userId } = userData;
  const { _id: mindMapId } = mindMapData;

  useEffect(() => {
    const fetchNodeImageData = async () => {
      // TODO getNodesData 인자 안에 userId, mindMapId 추가되어야 함
      const res = await getNodesData(nodeId);
      setImageList(res.node[nodeId].images);
    };

    fetchNodeImageData();
  }, []);

  const writeTitleHandler = e => {
    const tempData = { ...nodeData };

    tempData[nodeId] = { ...tempData[nodeId], title: e.target.value };

    setNodeData(tempData);

    debounce(() => {
      putNodesData(userId, mindMapId, nodeId, tempData[nodeId]);
    }, 1500);

    socket.emit('titleChange', mindMapId, nodeId, e.target.value);
  };

  const writeDescriptionHandler = e => {
    const tempData = { ...nodeData };

    tempData[nodeId] = { ...tempData[nodeId], content: e.target.value };

    setNodeData(tempData);

    debounce(() => {
      putNodesData(userId, mindMapId, nodeId, tempData[nodeId]);
    }, 1500);

    socket.emit('contentChange', mindMapId, nodeId, e.target.value);
  };

  const addImageHandler = imageArray => {
    const tempData = { ...nodeData };
    tempData[nodeId] = { ...tempData[nodeId], images: imageArray };

    setNodeData(tempData);
  };

  return (
    <Container isOpen={isOpenNodeRightOptionMenu}>
      <MenuBody className="closeButton">
        <Image
          src="/images/fast-forward.png"
          width="20px"
          height="20px"
          className="closeIcon"
          onClick={() => setNodeRightOptionMode(false)}
        />
      </MenuBody>
      <ScrollWraper>
        <Scroll>
          <MenuWrapper>
            <TitleMenu className="title">
              <MenuTitle>Title</MenuTitle>
              <TitleInput
                value={nodeData[nodeId]?.title}
                onChange={writeTitleHandler}
              />
            </TitleMenu>
            <DescriptionMenu className="description">
              <MenuTitle>Description</MenuTitle>
              <DescriptionTextArea
                value={nodeData[nodeId]?.content}
                onChange={writeDescriptionHandler}
              />
            </DescriptionMenu>
            <ImageMenu className="image">
              <MenuTitle>Image</MenuTitle>
              <NodeImageDropZone
                userId={userId}
                mindMapId={mindMapId}
                nodeId={nodeId}
                addImage={addImageHandler}
                className="dragZone"
              />
            </ImageMenu>
            <ImageList>
              <MenuTitle>Image List</MenuTitle>
              <ImageWrapper>
                {nodeData[nodeId]?.images.map(img => {
                  const { _id: id } = img;
                  return (
                    <NodeImg
                      src={process.env.NEXT_PUBLIC_BASE_URL + img.path}
                      alt={img.originalName}
                      key={id}
                      className="img"
                    />
                  );
                })}
              </ImageWrapper>
            </ImageList>
          </MenuWrapper>
        </Scroll>
      </ScrollWraper>
    </Container>
  );
}

const Container = styled(flexCenter)`
  flex-grow: 1;
  width: 100%;
  min-height: 500px;
  height: 100%;
  z-index: 100;
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
`;

const ScrollWraper = styled.div`
  width: 100%;
  height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Scroll = styled.div`
  overflow: auto;
  flex-grow: 1;
`;

const MenuWrapper = styled.div`
  height: 100%;
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
  min-height: 150px;
`;

export const MenuBody = styled(flexCenter)`
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
  min-height: 150px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const MenuTitle = styled.div`
  width: 100%;
  margin: 10px 0 0 10px;
  font-size: 15px;
`;

const TitleMenu = styled(MenuBody)`
  justify-content: space-between;
  flex-grow: 0;
  min-height: 100px;
  max-height: 100px;
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

const DescriptionMenu = styled(MenuBody)`
  flex-grow: 0;
  min-height: 200px;
`;

const DescriptionTextArea = styled.textarea`
  margin: 10px 0;
  width: 90%;
  height: 150px;
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

const ImageMenu = styled(MenuBody)``;

const ImageWrapper = styled(flexCenter)`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const ImageList = styled(MenuBody)`
  flex-grow: 1;
  height: 100%;

  .img {
    margin: 0 5px;
  }
`;

const NodeImg = styled.img`
  width: 100px;
  margin: 10px;
`;
