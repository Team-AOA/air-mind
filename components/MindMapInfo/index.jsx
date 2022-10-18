import React from 'react';

import styled from 'styled-components';

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
  width: 100%;
  color: white;
  font-size: 20px;
`;

const MindMapPublicSelect = styled.select`
  width: 100%;
  height: 35px;
  border: none;
  background: white;
  color: gray;
  font-size: 14px;
  padding-left: 5px;
  margin-left: 10px;
`;

const MindMapPublicOption = styled.option`
  display: flex;
  background: white;
  padding: 0px 2px 1px;
  color: black;
  white-space: pre;
  min-height: 20px;
`;

const MindMapPrivateOption = styled.option`
  display: flex;
  background: white;
  padding: 0px 2px 1px;
  color: black;
  white-space: pre;
  min-height: 20px;
`;
