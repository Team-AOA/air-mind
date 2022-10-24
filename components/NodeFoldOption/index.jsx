import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useRecoilState, useRecoilValue } from 'recoil';
import { putNodesData } from '../../service/nodeRequests';
import { mindMapInfo, nodesInfo } from '../../store/states';
import countChildren from '../../utils/countChildren';

export default function NodeFoldOption({ x, y, nodeId, isFold }) {
  const [fold, setFold] = useState(isFold);
  const [numberOfChildren, setNumberOfChildren] = useState();
  const mindMap = useRecoilValue(mindMapInfo);
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const { _id: mindMapId } = mindMap;
  const { _id: userId } = mindMap.author;

  const foldHandler = () => {
    setFold(!fold);
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };
      tempSel.attribute = {
        ...tempSel.attribute,
        isFold: !fold,
      };
      temp[nodeId] = tempSel;

      putNodesData(userId, mindMapId, nodeId, temp[nodeId]);

      return temp;
    });
  };

  useEffect(() => {
    if (fold && nodeId && Object.keys(nodeData).length > 0) {
      setNumberOfChildren(countChildren(nodeId, nodeData));
    }
  }, [nodeId, nodeData]);

  return (
    <foreignObject x={x - 20} y={y} width={50} height={50}>
      <FoldButton onClick={foldHandler}>
        {fold ? numberOfChildren : '-'}
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
  border: 1px solid black;
  background-color: white;
`;

NodeFoldOption.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  nodeId: PropTypes.string.isRequired,
  isFold: PropTypes.bool.isRequired,
};