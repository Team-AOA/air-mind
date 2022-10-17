import React from 'react';

import styled from 'styled-components';

export default function NodeButtonBox() {
  return (
    <NodeButtonWrapper>
      <button type="button">+</button>
      <button type="button">삭제</button>
      <button type="button">댓글</button>
    </NodeButtonWrapper>
  );
}

const NodeButtonWrapper = styled.div``;
