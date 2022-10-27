import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  clickedNodeId,
  isOpenNodeCommentModal,
  mindMapInfo,
  nodesInfo,
  userInfo,
  currentUserInfo,
  socketInfo,
} from '../../store/states';
import flexCenter from '../shared/FlexCenterContainer1';
import { Button } from '../shared/Button1';
import { postCommentsData } from '../../service/nodeRequests';
import ProfileIcon from '../shared/ProfileIcon1';
import { NO_PERMISSION_MESSAGE } from '../../constants/constants1';

export default function NodeComment() {
  const commentList = useRef();
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const mindMapData = useRecoilValue(mindMapInfo);
  const userData = useRecoilValue(userInfo);
  const nodeId = useRecoilValue(clickedNodeId);
  const currentUser = useRecoilValue(currentUserInfo);

  const socket = useRecoilValue(socketInfo);

  const isOpenCommentMenu = useRecoilValue(isOpenNodeCommentModal);
  const setNodeCommentMode = useSetRecoilState(isOpenNodeCommentModal);

  const [currentComment, setCurrentComment] = useState('');
  const [keyTransfer, setKeyTransfer] = useState(false);

  const { _id: userId } = userData;
  const { _id: mindMapId } = mindMapData;

  const scrollToBottom = () => {
    if (commentList.current) {
      commentList.current.scrollTop = commentList.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [nodeData, currentComment]);

  const createCommentClickHandler = async () => {
    if (!nodeId) return;
    if (!currentUser.username) {
      alert(NO_PERMISSION_MESSAGE);
      return;
    }

    try {
      const tempData = { ...nodeData };
      const currentCommentsArray = [...tempData[nodeId].comments];

      const comment = {
        author: currentUser.username,
        content: currentComment,
        profile: currentUser.profile,
      };

      await postCommentsData(userId, mindMapId, nodeId, comment);
      socket.emit('addComment', nodeId, mindMapId, comment);

      currentCommentsArray.push(comment);

      tempData[nodeId] = {
        ...tempData[nodeId],
        comments: currentCommentsArray,
      };

      setNodeData(tempData);
    } catch (error) {
      console.log(error);
    }
    setCurrentComment('');
  };

  const onKeyDownHandler = e => {
    if (e.code === 'Enter' && currentComment && keyTransfer) {
      createCommentClickHandler();
      setKeyTransfer(false);
    }
  };

  const modalCloseHandler = e => {
    e.stopPropagation();
  };

  return (
    <CommentContainer isOpen={isOpenCommentMenu} onClick={modalCloseHandler}>
      <ButtonWrapper>
        <Image
          src="/images/close.png"
          width="20px"
          height="20px"
          className="closeIcon"
          onClick={() => setNodeCommentMode(false)}
        />
      </ButtonWrapper>
      <CommentBody>
        <CommentList ref={commentList}>
          {nodeId &&
            nodeData[nodeId]?.comments.map(comment => {
              return (
                <Comment key={uuidv4()}>
                  <ProfileIcon
                    src={comment?.profile}
                    alt="profile"
                    size="small"
                  />
                  <div>
                    <Author>{comment?.author}</Author>
                    <Content>{comment?.content}</Content>
                  </div>
                </Comment>
              );
            })}
        </CommentList>
        <CommentTextBar>
          <CommentTextArea
            placeholder="Add to the discussion"
            value={currentComment}
            onChange={e => setCurrentComment(e.target.value)}
            onKeyDown={e => {
              setKeyTransfer(true);
              onKeyDownHandler(e);
            }}
          />
          <Button className="submitButton" onClick={createCommentClickHandler}>
            Send
          </Button>
        </CommentTextBar>
      </CommentBody>
    </CommentContainer>
  );
}

const CommentContainer = styled(flexCenter)`
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  width: 400px;
  height: 500px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  transform: ${props => (props.isOpen ? 'translateX(400)' : 'translateX(0)')};
  transition: all 2s ease-in-out;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 10px 15px 10px 0;
  transition: background-color 0.3s ease;

  .closeIcon {
    width: 30px
    margin: 10px;
    padding-right: 10px;
    cursor: pointer;
  }
`;

const Author = styled.div`
  padding: 4px 14px;
`;

const Content = styled.div`
  padding: 5px 14px 10px 14px;
`;

const Comment = styled.div`
  display: flex;

  .profile {
    width: 20px;
    height: 20px;
  }
`;

const CommentList = styled.div`
  width: 90%;
  min-height: 300px;
  max-height: 300px;
  overflow: scroll;
`;

const CommentTextBar = styled.div`
  display: flex;
  width: 80%;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  padding: 5px;

  .submitButton {
    border: 1px solid #eff0f5;
    border-radius: 0 5px 5px 0;

    &:hover {
      background-color: #00c500;
      color: white;
    }
  }
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  height: 60px;
  border: none;
  resize: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const CommentBody = styled(flexCenter)`
  width: 380px;
  height: 400px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
