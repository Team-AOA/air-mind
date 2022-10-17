import React from "react";

import styled from "styled-components";

// import NodeAddButton from "./NodeAddButton";
// import NodeCommentButton from "./NodeCommentButton";
// import NodeDeleteButton from "./NodeDeleteButton";

export default function NodeButtonBox() {
  return (
    <NodeButtonWrapper>
      <button>+</button>
      <button>삭제</button>
      <button>댓글</button>
    </NodeButtonWrapper>
  );
}

const NodeButtonWrapper = styled.div``;
