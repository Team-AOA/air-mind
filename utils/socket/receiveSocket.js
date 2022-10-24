import calculateNewNodePosition from '../d3/calculateNewNodePosition';
import { postNodesData, deleteNodesData } from '../../service/nodeRequests';
import deleteNodeHelper from '../deleteNodeHelper';

const receiveSocket = (socket, setNodeData) => {
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

  socket.on(
    'receiveDeleteNode',
    async (nodeId, nodeData, userId, mindMapId) => {
      deleteNodeHelper(nodeId, nodeData, setNodeData);
      await deleteNodesData(userId, mindMapId, nodeId);
    },
  );

  socket.on('receiveAddNode', (id, headId, userId, mindMapId, nodeId) => {
    const createNode = async () => {
      const calculated = calculateNewNodePosition(id, headId);
      console.log(userId, mindMapId, nodeId);
      const newNode = await postNodesData(userId, mindMapId, nodeId, {
        attribute: calculated,
      });

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
    };
    createNode(id, headId);
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
};

export default receiveSocket;
