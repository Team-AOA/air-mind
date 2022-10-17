import React from 'react';

import styled from 'styled-components';

import Comment from '../Comment';

export default function CommentList() {
  return (
    <CommentListBox>
      <Comment />
    </CommentListBox>
  );
}

const CommentListBox = styled.div`
  border: 1px solid black;
  height: 75%;
`;
