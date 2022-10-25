import deleteNodeHelper from '../deleteNodeHelper';

const receiveSocket = (socket, setNodeData, setMindMapData) => {
  socket.on('receiveColor', (nodeId, color) => {
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.attribute = {
        ...tempSel.attribute,
        color,
      };
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveTitle', (nodeId, updatedContent) => {
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.title = updatedContent;
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveContent', (nodeId, updatedDescription) => {
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.content = updatedDescription;
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveDeleteNode', (nodeId, nodeData) => {
    deleteNodeHelper(nodeId, nodeData, setNodeData);
  });

  socket.on('receiveAddNode', (newNode, nodeId) => {
    setNodeData(prev => {
      const tempData = { ...prev };
      const { _id: newId } = newNode.node;
      const newParent = {
        ...tempData[nodeId],
        children: [...tempData[nodeId].children, newId],
      };

      tempData[nodeId] = newParent;
      tempData[newId] = newNode.node;

      return { ...prev, ...tempData };
    });
  });

  socket.on('receivePosition', (nodeId, updatedPositionX, updatedPositionY) => {
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.attribute = {
        ...tempSel.attribute,
        cordX: updatedPositionX,
        cordY: updatedPositionY,
      };

      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveFold', (isFold, nodeId) => {
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };
      tempSel.attribute = {
        ...tempSel.attribute,
        isFold: !isFold,
      };
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveMindMapTitleChange', (mindMapData, value) => {
    setMindMapData({
      ...mindMapData,
      title: value,
    });
  });
};

export default receiveSocket;
