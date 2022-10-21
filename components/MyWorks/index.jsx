import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Header from '../Header';
import NavBar from '../Navbar';
import MindMapCard from '../MindMapCard';

import { getMyMindMapData } from '../../service/mindMapRequests';

export default function MyWorks() {
  const [myMindMapData, setMyMindMapData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMyMindMapData = async () => {
      try {
        const data = await getMyMindMapData();

        setMyMindMapData(data.mindMap);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    fetchMyMindMapData();
  }, []);

  return (
    <Wrapper>
      <Header />
      <NavBar />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <MindMapsWrapper>
        {myMindMapData[0] &&
          myMindMapData.map(mindMap => {
            const { _id: id } = mindMap;
            return (
              <MindMapCard
                key={id}
                title={mindMap.title}
                author={mindMap.author}
                headNode={mindMap.headNode}
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
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const MindMapsWrapper = styled.div`
  display: grid;
  padding: 2em 0 0;
  width: 90%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: 300px 300px 300px;
  column-gap: 20px;
  row-gap: 20px;
`;

const ErrorMessage = styled.div``;
