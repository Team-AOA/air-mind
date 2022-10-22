import React, { useState } from 'react';

import styled from 'styled-components';

export default function MindMapInfo() {
  const [mindMapTitle, setMindMapTitle] = useState('');
  const [publicOption, setPublicOption] = useState('');

  const handleMindMapTitle = event => {
    setMindMapTitle(event.target.value);
  };

  const handlePublicOption = event => {
    setPublicOption(event.target.value);
  };

  return (
    <MindMapInfoWrapper>
      <MindMapTitle value={mindMapTitle} onChange={handleMindMapTitle} />
      <MindMapPublicSelect onChange={handlePublicOption} value={publicOption}>
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

const MindMapTitle = styled.input`
  width: 100%;
  font-size: 20px;
`;

const MindMapPublicSelect = styled.select`
  width: 40%;
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
