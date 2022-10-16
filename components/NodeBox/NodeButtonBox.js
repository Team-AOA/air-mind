import React from "react";

import styled from "styled-components";

import NodeAddButton from "./NodeAddButton";
import NodeCommentButton from "./NodeCommentButton";
import NodeDeleteButton from "./NodeDeleteButton";

export default function NodeButtonBox() {
  return (
    <NodeButtonWrapper>
      <NodeAddButton />
      <NodeDeleteButton />
      <NodeCommentButton />
    </NodeButtonWrapper>
  );
}

const NodeButtonWrapper = styled.div``;
