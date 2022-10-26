import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useRecoilState, useRecoilValue } from 'recoil';
import { putNodesData } from '../../service/nodeRequests';
import {
  currentUserInfo,
  mindMapInfo,
  nodesInfo,
  socketInfo,
} from '../../store/states';
import countChildren from '../../utils/countChildren';

export default function NodeFoldOption({ x, y, nodeId, isFold }) {
  const [numberOfChildren, setNumberOfChildren] = useState();
  const mindMap = useRecoilValue(mindMapInfo);
  const currentUser = useRecoilValue(currentUserInfo);
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const { _id: mindMapId } = mindMap;
  const { _id: userId } = mindMap.author;
  const socket = useRecoilValue(socketInfo);

  const foldHandler = e => {
    e.stopPropagation();
    if (currentUser && Object.keys(currentUser).length > 0) {
      setNodeData(prev => {
        const temp = { ...prev };
        const tempSel = { ...temp[nodeId] };

        tempSel.attribute = {
          ...tempSel.attribute,
          isFold: !tempSel.attribute.isFold,
        };
        temp[nodeId] = tempSel;

        putNodesData(userId, mindMapId, nodeId, temp[nodeId]);

        socket.emit('fold', !tempSel.attribute.isFold, mindMapId, nodeId);

        return temp;
      });
    }
  };

  useEffect(() => {
    if (isFold && nodeId && Object.keys(nodeData).length > 0) {
      setNumberOfChildren(countChildren(nodeId, nodeData));
    }
  }, [isFold, nodeId, nodeData]);

  return (
    <foreignObject
      x={x - 20}
      y={y}
      width={25}
      height={25}
      onClick={foldHandler}
    >
      <FoldButton onClick={foldHandler}>
        {isFold ? numberOfChildren : '-'}
      </FoldButton>
    </foreignObject>
  );
}

const FoldButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 2px solid black;
  background-color: white;
  font-weight: 500;
`;

NodeFoldOption.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  nodeId: PropTypes.string.isRequired,
  isFold: PropTypes.bool.isRequired,
};
