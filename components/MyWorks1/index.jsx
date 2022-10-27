import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import Header from '../Header1';
import NavBar from '../Navbar1';
import MindMapCard from '../MindMapCard1';

import {
  getMyMindMapData,
  updateMindMapData,
} from '../../service/mindMapRequests1';
import { currentUserInfo } from '../../store/states';

export default function MyWorks() {
  const [myMindMapData, setMyMindMapData] = useState([]);
  const [currentError, setCurrentError] = useState({});
  const currentUserData = useRecoilValue(currentUserInfo);
  const { _id: currentUserId } = currentUserData;

  useEffect(() => {
    const fetchMyMindMapData = async id => {
      try {
        const data = await getMyMindMapData(id);

        setMyMindMapData(data.mindMap);
      } catch (error) {
        console.log(error);
        setCurrentError(error);
      }
    };

    if (currentUserId) {
      fetchMyMindMapData(currentUserId);
    }
  }, [currentUserId]);

  const renameHandler = useCallback(
    (authorId, mindMapId, updatedTitle) => {
      let updatedMindMap;

      const updatedMindmaps = myMindMapData.map(mindMap => {
        const { _id: id } = mindMap;
        if (id === mindMapId) {
          updatedMindMap = { ...mindMap, title: updatedTitle };
          return updatedMindMap;
        }
        return mindMap;
      });
      setMyMindMapData(updatedMindmaps);

      return updateMindMapData(authorId, mindMapId, updatedMindMap);
    },
    [myMindMapData],
  );

  return (
    <Wrapper>
      <Header />
      <NavBar />
      {currentError.message && (
        <ErrorMessage>{currentError.message}</ErrorMessage>
      )}
      <MindMapsWrapper>
        {myMindMapData[0] &&
          myMindMapData.map(mindMap => {
            const { _id: id } = mindMap;
            return (
              <MindMapCard
                key={id}
                mindMap={mindMap}
                renameTitleHandler={renameHandler}
              />
            );
          })}
      </MindMapsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const MindMapsWrapper = styled.div`
  display: grid;
  padding: 2em 0 0;
  width: 90%;
  grid-template-columns: repeat(auto-fit, minmax(330px, 350px));
  grid-template-rows: 320px 350px 320px;
  justify-content: center;
  column-gap: 20px;
  row-gap: 20px;
`;

const ErrorMessage = styled.div``;
