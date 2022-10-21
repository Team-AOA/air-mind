import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Header from '../Header';
import NavBar from '../Navbar';
import MindMapCard from '../MindMapCard';

import getPublicMindMapData from '../../service/mindMapRequests';

export default function Home() {
  const [mindMapData, setMindMapData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { _id: id } = mindMapData;

  useEffect(() => {
    async function fetchPublicMindMapData() {
      try {
        const data = await getPublicMindMapData();
        setMindMapData(data.mindMap);
      } catch (error) {
        setErrorMessage(error);
      }
    }
    fetchPublicMindMapData();
  }, []);

  return (
    <Wrapper>
      <Header />
      <NavBar />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <MindMapsWrapper>
        {mindMapData[0] &&
          mindMapData.map(mindMap => {
            return <MindMapCard key={id} mindMap={mindMap} />;
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
