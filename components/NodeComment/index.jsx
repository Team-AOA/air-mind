import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import flexCenter from '../shared/FlexCenterContainer';
import { Button } from '../shared/Button';
import {
  getCommentsData,
  postCommentsData,
} from '../../utils/api/nodeRequests';
import { isOpenNodeCommentModal, clickedNodeId } from '../../store/states';

export default function NodeComment() {
  const commentList = useRef();
  const [allComments, setAllComments] = useState([]);
  // const [newComment, setNewComment] = useState('');
  const isOpenCommentMenu = useRecoilValue(isOpenNodeCommentModal);
  const setNodeCommentModal = useSetRecoilState(isOpenNodeCommentModal);

  const nodeId = useRecoilValue(clickedNodeId);

  useEffect(() => {
    const getComments = async () => {
      try {
        // Todo
        console.log(nodeId);
        const response = await getCommentsData();
        setAllComments([...response.data.data]);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);

  const createCommentHandler = async () => {
    try {
      // Todo
      await postCommentsData();
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = () => {
    if (commentList.current) {
      commentList.current.scrollTop = commentList.current.scrollHeight;
    }
  };

  const createCommentElement = commentsArray => {
    return commentsArray.map(comment => {
      const { _id: id } = comment;
      return (
        <div key={id}>
          <Author>{comment.author}</Author>
          <Content>{comment.content}</Content>
        </div>
      );
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allComments]);

  return (
    <CommentContainer isOpen={isOpenCommentMenu}>
      <ButtonWrapper>
        <CloseButton onClick={() => setNodeCommentModal(false)}>X</CloseButton>
      </ButtonWrapper>
      <CommentBody>
        <CommentList ref={commentList}>
          {createCommentElement(allComments)}
        </CommentList>
        <CommentTextBar>
          <CommentTextArea placeholder="Add to the discussion" />
          <Button className="submitButton" onClick={createCommentHandler}>
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
  width: 400px;
  height: 50px;
  transition: background-color 0.3s ease;
`;

const CloseButton = styled.div`
  width: 20px;
  height: 20px;
  padding: 10px;
  transition: background-color 0.3s ease;
  font-size: 30px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: gray;
  }
`;

const Author = styled.div`
  padding: 4px 14px;
`;

const Content = styled.div`
  padding: 5px 14px 10px 14px;
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
