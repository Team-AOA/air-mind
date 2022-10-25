import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import zoomPanning from '../../utils/d3/zoomPanning';
import makeNodeComponentList from '../../utils/d3/makeNodeComponentList';
import decideSocketUserNode from '../../utils/decideSocketUserNode';
import {
  nodesInfo,
  socketUserInfo,
  isOpenNodeOptionModal,
  currentUserInfo,
  mindMapInfo,
  socketInfo,
} from '../../store/states';

export default function NodeCanvas({ headNode }) {
  const groupRef = useRef();
  const wrapperRef = useRef();
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const [nodeComponentList, setNodeComponentList] = useState([]);
  const socketUserData = useRecoilValue(socketUserInfo);
  const [decidedSocketUser, setDecidedSocketUser] = useState({});
  const setNodeRightOptionMode = useSetRecoilState(isOpenNodeOptionModal);
  const currentUser = useRecoilValue(currentUserInfo);
  const mindMapData = useRecoilValue(mindMapInfo);
  const { _id: mindMapId } = mindMapData;
  const socket = useRecoilValue(socketInfo);

  useEffect(() => {
    zoomPanning(groupRef);
  }, []);

  useEffect(() => {
    setDecidedSocketUser(decideSocketUserNode(nodeData, socketUserData));
  }, [nodeData, socketUserData]);

  useEffect(() => {
    if (nodeData && Object.keys(nodeData).length > 0) {
      setNodeComponentList(
        makeNodeComponentList(
          nodeData,
          setNodeData,
          headNode,
          decidedSocketUser,
        ),
      );
    }
  }, [nodeData, decidedSocketUser]);

  const optionHandler = () => {
    setNodeRightOptionMode(false);
    socket.emit('leaveNode', currentUser, mindMapId);
  };

  return (
    <Container ref={wrapperRef}>
      <SVG onClick={optionHandler}>
        <g ref={groupRef}>{nodeComponentList}</g>
      </SVG>
    </Container>
  );
}

NodeCanvas.propTypes = {
  headNode: PropTypes.string.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  /* overflow: hidden; */
`;

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;
