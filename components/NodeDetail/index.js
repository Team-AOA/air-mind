import React from "react";

import styled from "styled-components";

export default function NodeDetail() {
  return (
    <NodeDetailWrapper>
      <NodeDetailForm>
        <NodeTitleLabel>Title</NodeTitleLabel>
        <NodeTitleInput></NodeTitleInput>
        <NodeDescriptionLabel>Description</NodeDescriptionLabel>
        <NodeDescriptionTextArea></NodeDescriptionTextArea>
        <ImageUpload>Drag and Drop</ImageUpload>
        <DeleteButton>Delete button</DeleteButton>
      </NodeDetailForm>
    </NodeDetailWrapper>
  );
}

const NodeDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  padding: 0.5rem;
  border: 1px solid black;
`;

const NodeDetailForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const NodeTitleLabel = styled.label``;

const NodeDescriptionLabel = styled.label``;

const NodeTitleInput = styled.input`
  height: 10%;
  margin: 0.5rem;
`;

const NodeDescriptionTextArea = styled.textarea`
  height: 60%;
  margin: 0.5rem;
`;

const DeleteButton = styled.button``;

const ImageUpload = styled.div`
  margin: 0.5rem;
  height: 30%;
  border: 1px solid black;
`;
