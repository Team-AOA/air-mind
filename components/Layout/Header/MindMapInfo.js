import React from "react";

import styled from "styled-components";

export default function MindMapInfo() {
  return (
    <MindMapInfoWrapper>
      <MindMapTitle>마인드맵 제목</MindMapTitle>
      <MindMapPublicSelect>
        <MindMapPublicOption>Public</MindMapPublicOption>
        <MindMapPrivateOption>Private</MindMapPrivateOption>
      </MindMapPublicSelect>
    </MindMapInfoWrapper>
  );
}

const MindMapInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const MindMapTitle = styled.div`
  color: white;
`;
const MindMapPublicSelect = styled.select``;
const MindMapPublicOption = styled.option``;
const MindMapPrivateOption = styled.option``;
