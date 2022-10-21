import * as d3 from 'd3';

const calculateNewNodePosition = (nodeId, headNodeId) => {
  const node = d3.select(`#node${nodeId}`);
  const headNode = d3.select(
    `#node${headNodeId || '634e4e47475c008330626937'}`,
  );

  const nodeRect = node.node().getBoundingClientRect();
  const headNodeRect = headNode.node().getBoundingClientRect();

  const cordX = nodeRect.x + (headNodeRect.x - nodeRect.x < 0) ? 50 : -50;
  const cordY = nodeRect.y + (headNodeRect.y - nodeRect.y < 0) ? 50 : -50;

  return { cordX, cordY };
};

export default calculateNewNodePosition;
