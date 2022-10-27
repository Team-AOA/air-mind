import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import flexCenter from '../shared/flexcentercontainer';
import { currentUserInfo, socketInfo } from '../../store/states';
import { postImagesData } from '../../service/noderequests';
import { Button } from '../shared/button';
import { IMAGES_MAXIMUM_LENGTH_MESSAGE } from '../../constants/constants';

export default function NodeImageDropZone({
  userId,
  mindMapId,
  nodeId,
  addImage,
}) {
  const uploadFile = useRef();
  const [isImgDropZone, setIsImgDropZone] = useState(false);
  const currentUserData = useRecoilValue(currentUserInfo);
  const socket = useRecoilValue(socketInfo);

  const handleOnImgDropZone = e => {
    e.preventDefault();
    e.stopPropagation();

    setIsImgDropZone(false);
  };

  const handleOffImgDropZone = e => {
    e.preventDefault();
    e.stopPropagation();

    setIsImgDropZone(true);
  };

  // eslint-disable-next-line consistent-return
  const handleDrop = async e => {
    e.preventDefault();
    e.stopPropagation();
    const images = e.dataTransfer
      ? [...e.dataTransfer.files]
      : [...e.target.files];

    if (images.length > 3) {
      return alert(IMAGES_MAXIMUM_LENGTH_MESSAGE);
    }
    const formData = new FormData();

    images?.forEach(image => formData.append('images', image));

    if (currentUserData && Object.keys(currentUserData).length > 0) {
      try {
        const response = await postImagesData(
          userId,
          mindMapId,
          nodeId,
          formData,
        );
        setIsImgDropZone(false);
        addImage(response.node.images);
        socket.emit('addImages', mindMapId, nodeId, response.node.images);
      } catch (error) {
        if (error.code === 400) {
          setIsImgDropZone(false);
          return alert(error.message);
        }
      }
    }
  };

  const handleClickUpload = () => {
    uploadFile.current.click();
  };

  return (
    <ImageDropArea
      onDragEnter={handleOnImgDropZone}
      onDragOver={handleOffImgDropZone}
      onDragLeave={handleOnImgDropZone}
      onDrop={handleDrop}
      isImgDropZone={isImgDropZone}
    >
      <Image
        src="/images/noun-drag-and-drop-4076502.png"
        width="60px"
        height="50px"
        className="dragIcon"
      />
      <input
        id="fileSelect"
        ref={uploadFile}
        type="file"
        multiple
        accept=".png, .jpg, .jpeg, .JPG, .JPEG"
        onChange={e => handleDrop(e)}
      />
      <label htmlFor="fileSelect" onChange={e => handleDrop(e)}>
        You can select 3 images at a time. (maximum 5mb)
      </label>
      <UploadButton onClick={handleClickUpload}>Upload</UploadButton>
    </ImageDropArea>
  );
}

NodeImageDropZone.propTypes = {
  addImage: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  mindMapId: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
};

const ImageDropArea = styled(flexCenter)`
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  position: relative;

  width: 85%;
  height: 130px;

  margin: 10px 0;
  padding: 10px 10px;

  border: 1px solid #eff0f5;
  border-radius: 10px;
  background-color: ${props =>
    props.isImgDropZone ? '#d1ecfe' : 'rgba(255, 255, 255, 0.8)'};
  transition: 0.2s ease;
  transform: ${props => (props.isImgDropZone ? 'scale(1.02)' : 'scale(1)')};

  input {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    white-space: nowrap;
    width: 100px;
    display: block !important;
  }

  label {
    text-align: center;
    color: gray;
  }

  &:hover {
    transform: scale(1.02);
    background-color: #d1ecfe;
  }

  .dragIcon {
    position: absolute;
  }
`;

const UploadButton = styled(Button)`
  width: 100px;
  height: 40px;
  background-color: none;
  border-radius: 5px;
  border: 1px solid #2c2c2c;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background-color: #2c2c2c;
    color: white;
  }
`;
