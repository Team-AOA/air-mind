import React from 'react';

import styled from 'styled-components';

import CommentInputBox from '../CommentInputBox';
import CommentList from '../CommentList';

export default function CommentBox() {
  return (
    <CommentBoxWrapper>
      <CommentList />
      <CommentInputBox />
    </CommentBoxWrapper>
  );
}

const CommentBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 600px;
  padding: 0.5rem;
  border: 1px solid black;
`;
