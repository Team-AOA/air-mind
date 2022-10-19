import Node from '../../components/Node';
import NodeWithLine from '../../components/NodeWithLine';

export default function makeNodeComponentList(nodeData, setNodeData, headNode) {
  const nodeComponentList = [];
  const nodeQueue = [headNode];

  while (nodeQueue.length > 0) {
    nodeComponentList.push(Node, NodeWithLine);
    console.log(nodeComponentList);
  }
}

// export default makeNodeComponentList;
