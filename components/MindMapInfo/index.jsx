import React, { useState } from 'react';
// import { useRecoilValue, useSetRecoilState } from 'recoil';

import styled from 'styled-components';

import { RiDeleteBin6Line as RecycleBinIcon } from 'react-icons/ri';
import flexCenter from '../shared/FlexCenterContainer';
// import { currentUserInfo, errorInfo } from '../../store/states';
// import { deleteMindMapData } from '../../service/mindMapRequests';

import { FAIL_DELETE_MIND_MAP } from '../../constants/constants';

export default function MindMapInfo() {
  const [mindMapTitle, setMindMapTitle] = useState('');
  const [publicOption, setPublicOption] = useState('');
  // const setError = useSetRecoilState(errorInfo);
  // const user = useRecoilValue(currentUserInfo);

  const handleMindMapTitle = event => {
    setMindMapTitle(event.target.value);
  };

  const handlePublicOption = event => {
    setPublicOption(event.target.value);
  };

  const handleMindMapDelete = async () => {
    try {
      // if (user.mindMapList.filter(mindMapId)) {
      // await deleteMindMapData(mindMapId);
      // return;
      // }
      alert(FAIL_DELETE_MIND_MAP);
    } catch (error) {
      // setError(error);
    }
  };

  return (
    <MindMapInfoWrapper>
      <MindMapTitle value={mindMapTitle} onChange={handleMindMapTitle} />
      <MindMapPublicSelect onChange={handlePublicOption} value={publicOption}>
        <MindMapPublicOption>Public</MindMapPublicOption>
        <MindMapPrivateOption>Private</MindMapPrivateOption>
      </MindMapPublicSelect>
      <Icon onClick={handleMindMapDelete}>
        <RecycleBinIcon size="60" className="icon" />
      </Icon>
    </MindMapInfoWrapper>
  );
}

const Icon = styled(flexCenter)`
  width: 40px;
  height: 35px;
  border-right: 1px solid #e6e6e6;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.3s ease;
  margin-left: 10px;
  &:hover {
    background-color: #dbdbdb;
  }
`;

const MindMapInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MindMapTitle = styled.input`
  width: 90%;
  font-size: 20px;
`;

const MindMapPublicSelect = styled.select`
  width: 30%;
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
