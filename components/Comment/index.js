import React from "react";

import styled from "styled-components";

export default function Comment() {
  return (
    <CommentWrapper>
      <CommentHeader>
        <CommentAuthorIcon>사용자아이콘</CommentAuthorIcon>
        <CommentAuthorName>사용자이름</CommentAuthorName>
        <CommentTimeStamp>댓글작성시간</CommentTimeStamp>
      </CommentHeader>
      <CommentContent>댓글내용</CommentContent>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  border: 1px solid black;
`;
const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
`;
const CommentAuthorIcon = styled.div`
  border: 1px solid black;
`;
const CommentAuthorName = styled.div`
  border: 1px solid black;
`;
const CommentTimeStamp = styled.div`
  border: 1px solid black;
`;
const CommentContent = styled.div`
  border: 1px solid black;
`;
