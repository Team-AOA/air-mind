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
  color: white;
  width: 100%;
  font-size: 20px;
`;

const MindMapPublicSelect = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
`;

const MindMapPublicOption = styled.option`
  color: black;
  background: white;
  display: flex;
  white-space: pre;
  min-height: 20px;
  padding: 0px 2px 1px;
`;

const MindMapPrivateOption = styled.option`
  color: black;
  background: white;
  display: flex;
  white-space: pre;
  min-height: 20px;
  padding: 0px 2px 1px;
`;
