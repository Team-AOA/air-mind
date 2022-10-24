import React from 'react';

import Node from '../../components/Node';
import NodeWithLine from '../../components/NodeWithLine';

const makeNodeComponentList = (nodeData, setNodeData, headNode) => {
  const nodeComponentList = [];
  const nodeQueue = [];

  nodeComponentList.push(
    <Node
      key={headNode}
      nodeId={headNode}
      nodeData={nodeData}
      setNodeData={setNodeData}
    />,
  );

  if (nodeData[headNode]?.attribute.isFold === false) {
    nodeQueue.push(...nodeData[headNode].children);
  }

  while (nodeQueue.length > 0) {
    const tempNode = nodeQueue.shift();
    const tempParentNode = nodeData[tempNode].parent;

    if (nodeData[tempNode].attribute.isFold === false) {
      nodeQueue.push(...nodeData[tempNode].children);
    }

    nodeComponentList.unshift(
      <NodeWithLine
        key={tempNode}
        parentNodeId={tempParentNode}
        childNodeId={tempNode}
        nodeData={nodeData}
        setNodeData={setNodeData}
      />,
    );
  }

  return nodeComponentList;
};

export default makeNodeComponentList;
