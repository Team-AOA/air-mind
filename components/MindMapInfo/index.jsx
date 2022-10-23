import React, { useState } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import router from 'next/router';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { RiDeleteBin6Line as RecycleBinIcon } from 'react-icons/ri';
import flexCenter from '../shared/FlexCenterContainer';
import { userInfo, errorInfo, mindMapInfo } from '../../store/states';
import {
  deleteMindMapData,
  updateMindMapData,
} from '../../service/mindMapRequests';

import {
  FAIL_DELETE_MIND_MAP,
  FAIL_DELETE_MIND_MAP_BY_SERVER_PROBLEM,
  FAIL_CHANGE_MIND_MAP_PUBLIC_OPTION,
} from '../../constants/constants';

export default function MindMapInfo({ mindMapId }) {
  const [mindMapTitle, setMindMapTitle] = useState('');
  const [publicOption, setPublicOption] = useState('');
  const [mindMapData, setMindMapData] = useRecoilState(mindMapInfo);

  const setError = useSetRecoilState(errorInfo);
  const userData = useRecoilValue(userInfo);

  const { _id: userId } = userData;
  const { author } = mindMapData;

  const handleMindMapTitle = event => {
    setMindMapTitle(event.target.value);
  };

  const handlePublicOption = async event => {
    try {
      if (author === userId) {
        setPublicOption(event.target.value);
        setMindMapData({
          ...mindMapData,
          access: event.target.value,
        });

        const data = await updateMindMapData(userId, mindMapId, mindMapData);
        const { mindMap } = data;

        setMindMapData(mindMap);
      } else {
        alert(FAIL_CHANGE_MIND_MAP_PUBLIC_OPTION);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleMindMapDelete = async () => {
    try {
      if (author === userId) {
        const confirmCheck = window.confirm('정말 삭제하시겠습니까?');

        if (!confirmCheck) {
          return;
        }

        const response = await deleteMindMapData(userId, mindMapId);
        const { result } = response;

        if (result === 'ok') {
          router.push('/');
        }
      } else {
        alert(FAIL_DELETE_MIND_MAP);
      }
    } catch (error) {
      setError(FAIL_DELETE_MIND_MAP_BY_SERVER_PROBLEM);
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

MindMapInfo.propTypes = {
  mindMapId: PropTypes.string.isRequired,
};

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
