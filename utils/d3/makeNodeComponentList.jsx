import React from 'react';

import Node from '../../components/Node';
import NodeWithLine from '../../components/NodeWithLine';

const makeNodeComponentList = (nodeData, setNodeData, headNode) => {
  const nodeComponentList = [];

  nodeComponentList.push(
    <Node
      key={headNode}
      nodeData={nodeData[headNode]}
      setNodeData={setNodeData}
    />,
  );

  const nodeQueue = [...nodeData[headNode].children];

  while (nodeQueue.length > 0) {
    const tempNode = nodeQueue.shift();
    const tempParentNode = nodeData[tempNode].parent;

    nodeQueue.push(...nodeData[tempNode].children);

    nodeComponentList.unshift(
      <NodeWithLine
        key={tempNode}
        parentNodeData={nodeData[tempParentNode]}
        childNodeData={nodeData[tempNode]}
        setNodeData={setNodeData}
      />,
    );
  }

  return nodeComponentList;
};

export default makeNodeComponentList;
