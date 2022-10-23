const countChildren = (nodeId, nodeData) => {
  const nodeQueue = [nodeId];
  let count = 0;

  while (nodeQueue.length > 0) {
    const tempId = nodeQueue.shift();
    const { children } = nodeData[tempId];

    if (children) {
      count += children.length;
      nodeQueue.push(...children);
    }
  }

  return count;
};

export default countChildren;
