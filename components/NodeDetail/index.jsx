import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import flexCenter from '../shared/FlexCenterContainer';

export default function NodeDetail() {
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');

  const writeTitleHandler = e => {
    setTitle(e.target.value);
  };

  const writeMemoHandler = e => {
    setMemo(e.target.value);
  };

  return (
    <TestWrapper>
      <MenuBody className="title">
        <MenuTitle>Title</MenuTitle>
        <TitleInput value={title} onChange={writeTitleHandler} />
      </MenuBody>
      <MenuBody className="memo">
        <MenuTitle>Memo</MenuTitle>
        <MemoTextArea value={memo} onChange={writeMemoHandler} />
      </MenuBody>
      <MenuBody className="image">
        <MenuTitle>Image</MenuTitle>
        <ImageDropArea>
          <Image
            src="/images/noun-drag-and-drop-4076502.png"
            width="100px"
            height="40px"
            className="dragIcon"
          />
        </ImageDropArea>
      </MenuBody>
      <MenuBody />
    </TestWrapper>
  );
}

const TestWrapper = styled(flexCenter)`
  flex-grow: 1;
  width: 100%;
  min-height: 500px;

  .title {
    justify-content: space-between;
    flex-grow: 0;
    min-height: 100px;
    max-height: 100px;
  }

  .memo {
    flex-grow: 0;
    min-height: 200px;
  }

  .image {
    max-height: 150px;
  }
`;

const MenuTitle = styled.div`
  width: 100%;
  margin: 10px 0 0 10px;
  font-size: 15px;
`;

const TitleInput = styled.input`
  width: 90%;
  height: 50px;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  margin: 10px 0;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const MemoTextArea = styled.textarea`
  margin: 10px 0;
  width: 90%;
  height: 90%;
  max-height: 500px;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  resize: none;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const ImageDropArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  position: relative;
  width: 90%;
  height: 90%;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    background-color: #d1ecfe;
  }

  .dragIcon {
    position: absolute;
  }
`;

const MenuBody = styled(flexCenter)`
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
  min-height: 150px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

// NodeDetail.propTypes = {
//   closeNodeOption: PropTypes.func.isRequired,
// };
