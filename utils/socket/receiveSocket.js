import deleteNodeHelper from '../deleteNodeHelper';

const receiveSocket = (
  socket,
  setNodeData,
  setMindMapData,
  router,
  setSocketUserData,
  isFoldLock,
) => {
  socket.on('receiveColor', (nodeId, color) => {
    setNodeData(prev => {
      if (!prev[nodeId]) {
        return prev;
      }

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
      if (!prev[nodeId]) {
        return prev;
      }

      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.title = updatedContent;
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveContent', (nodeId, updatedDescription) => {
    setNodeData(prev => {
      if (!prev[nodeId]) {
        return prev;
      }

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
      if (!prev[nodeId]) {
        return prev;
      }

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
      if (!prev[nodeId]) {
        return prev;
      }

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
    if (isFoldLock) {
      setNodeData(prev => {
        if (!prev[nodeId]) {
          return prev;
        }

        const temp = { ...prev };
        const tempSel = { ...temp[nodeId] };
        tempSel.attribute = {
          ...tempSel.attribute,
          isFold: !isFold,
        };
        temp[nodeId] = tempSel;

        return temp;
      });
    }
  });

  socket.on('receiveSizeChange', (nodeId, change) => {
    setNodeData(prev => {
      if (!prev[nodeId]) {
        return prev;
      }

      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      const currentSize = tempSel.attribute.size;
      let newSize;

      if (change === 'bigger') {
        switch (currentSize) {
          case 'SMALL':
            newSize = 'MEDIUM';
            break;
          case 'MEDIUM':
            newSize = 'LARGE';
            break;
          default:
            newSize = 'LARGE';
        }
      } else {
        switch (currentSize) {
          case 'LARGE':
            newSize = 'MEDIUM';
            break;
          case 'MEDIUM':
            newSize = 'SMALL';
            break;
          default:
            newSize = 'SMALL';
        }
      }

      tempSel.attribute = {
        ...tempSel.attribute,
        size: newSize,
      };
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveMindMapTitleChange', (mindMapData, value) => {
    const newMindMapData = { ...mindMapData, title: value };

    setMindMapData(newMindMapData);
  });

  socket.on('receivePublicOptionChange', (mindMapData, value) => {
    const newMindMapData = { ...mindMapData, access: value };

    setMindMapData(newMindMapData);
  });

  socket.on('receiveDeleteMindMap', () => {
    router.push('/');
  });

  socket.on('insertUser', (currentUserId, profile, nodeAncestorList) => {
    setSocketUserData(prev => {
      const tempData = { ...prev };
      tempData[currentUserId] = {
        nodeAncestorList,
        profile,
      };

      return tempData;
    });
  });

  socket.on('deleteUser', currentUserId => {
    setSocketUserData(prev => {
      const tempData = { ...prev };
      delete tempData[currentUserId];

      return tempData;
    });
  });
};

export default receiveSocket;
