import React from 'react';

import styled from 'styled-components';

export default function MindMapCard() {
  return (
    <Wrapper>
      <Body>스냅샷</Body>
      <Footer>
        <div>내용</div>
        <ButtonWrapper>
          <MindMapPublicChangeButton>퍼블릭 전환</MindMapPublicChangeButton>
          <MindMapDeleteButton>삭제</MindMapDeleteButton>
        </ButtonWrapper>
        <SettingButton>버튼</SettingButton>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  border: 1px solid black;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 10%;
`;

const SettingButton = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid white;
  color: white;
  background-color: royalBlue;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MindMapPublicChangeButton = styled.button``;

const MindMapDeleteButton = styled.button``;
