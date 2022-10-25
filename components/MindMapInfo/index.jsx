import React from 'react';
import Image from 'next/image';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import router from 'next/router';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import flexCenter from '../shared/FlexCenterContainer';
import {
  userInfo,
  errorInfo,
  mindMapInfo,
  currentUserInfo,
  socketInfo,
} from '../../store/states';
import {
  deleteMindMapData,
  updateMindMapData,
} from '../../service/mindMapRequests';
import {
  FAIL_DELETE_MIND_MAP,
  FAIL_DELETE_MIND_MAP_BY_SERVER_PROBLEM,
  FAIL_CHANGE_MIND_MAP_PUBLIC_OPTION,
  DELETE_CONFIRM_MESSAGE,
} from '../../constants/constants';
import debounce from '../../utils/debounce';

export default function MindMapInfo({ mindMapId }) {
  const [mindMapData, setMindMapData] = useRecoilState(mindMapInfo);
  const setError = useSetRecoilState(errorInfo);
  const userData = useRecoilValue(userInfo);
  const currentUser = useRecoilValue(currentUserInfo);
  const socket = useRecoilValue(socketInfo);

  let userId;
  let authorId;

  if (userData && Object.keys(userData).length > 0) {
    ({ _id: userId } = userData);
  }

  if (mindMapData && Object.keys(mindMapData).length > 0) {
    const { author } = mindMapData;
    ({ _id: authorId } = author);
  }

  const handleMindMapTitle = event => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      const newMindMapData = { ...mindMapData, title: event.target.value };

      setMindMapData(newMindMapData);

      debounce(() => {
        updateMindMapData(userId, mindMapId, newMindMapData);
      }, 1500);

      socket.emit(
        'mindMapTitleChange',
        mindMapId,
        mindMapData,
        event.target.value,
      );
    }
  };

  const handlePublicOption = async event => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      try {
        if (authorId === userId) {
          const newMindMapData = { ...mindMapData, access: event.target.value };

          setMindMapData(newMindMapData);

          await updateMindMapData(userId, mindMapId, newMindMapData);

          socket.emit(
            'publicOptionChange',
            mindMapId,
            mindMapData,
            event.target.value,
          );
        } else {
          alert(FAIL_CHANGE_MIND_MAP_PUBLIC_OPTION);
        }
      } catch (error) {
        setError(error);
      }
    }
  };

  const handleMindMapDelete = async () => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      try {
        if (authorId === userId) {
          const confirmCheck = window.confirm(DELETE_CONFIRM_MESSAGE);

          if (!confirmCheck) {
            return;
          }

          const response = await deleteMindMapData(userId, mindMapId);
          const { result } = response;

          socket.emit('deleteMindMap', mindMapId, result);

          if (result === 'ok') {
            router.push('/');
          }
        } else {
          alert(FAIL_DELETE_MIND_MAP);
        }
      } catch (error) {
        setError(FAIL_DELETE_MIND_MAP_BY_SERVER_PROBLEM);
      }
    }
  };

  return (
    <MindMapInfoWrapper>
      <MindMapTitle
        value={mindMapData.title || 'Untitled'}
        onChange={handleMindMapTitle}
      />
      <MindMapPublicSelect
        onChange={handlePublicOption}
        value={mindMapData.access}
      >
        <MindMapPublicOption>public</MindMapPublicOption>
        <MindMapPrivateOption>private</MindMapPrivateOption>
      </MindMapPublicSelect>
      <Icon onClick={handleMindMapDelete}>
        <Image
          src="/images/recycle-bin.png"
          width="50px"
          height="50px"
          className="icon"
        />
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
