import React from 'react';

import Node from '../../components/Node';
import NodeWithLine from '../../components/NodeWithLine';

import { MEDIUM } from '../../constants/nodeSize';

const makeNodeComponentList = (nodeData, setNodeData, headNode) => {
  const nodeComponentList = [];

  const headNodeInfo = {
    x: nodeData[headNode].attribute.cordX,
    y: nodeData[headNode].attribute.cordY,
    width: MEDIUM.width,
    height: MEDIUM.height,
    selector: headNode,
    setNodeData,
  };

  let parentNodeInfo = headNodeInfo;

  nodeComponentList.push(<Node {...headNodeInfo} />);

  const nodeQueue = nodeData[headNode].children.map(child => child.toString());

  while (nodeQueue.length > 0) {
    const tempNode = nodeQueue.shift();

    nodeQueue.push(
      ...nodeData[tempNode].children.map(child => child.toString()),
    );

    const childNodeInfo = {
      x: nodeData[tempNode].attribute.cordX,
      y: nodeData[tempNode].attribute.cordY,
      width: MEDIUM.width,
      height: MEDIUM.height,
      selector: tempNode,
      setNodeData,
    };

    nodeComponentList.unshift(
      <NodeWithLine
        parentNodeInfo={parentNodeInfo}
        childNodeInfo={childNodeInfo}
      />,
    );

    parentNodeInfo = childNodeInfo;
  }

  return nodeComponentList;
};

export default makeNodeComponentList;
