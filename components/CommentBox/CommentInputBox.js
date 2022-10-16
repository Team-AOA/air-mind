import React from "react";

import styled from "styled-components";

export default function CommentInputBox() {
  return (
    <CommentInputForm>
      <CommentInput placeholder="댓글을 입력해주세요..." />
      <CommentUploadButton>댓글 등록</CommentUploadButton>
    </CommentInputForm>
  );
}

const CommentInputForm = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20%;
`;
const CommentInput = styled.input`
  width: 90%;
`;
const CommentUploadButton = styled.button`
  width: 10%;
`;
