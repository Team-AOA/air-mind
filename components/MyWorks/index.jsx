import React from 'react';

import { useRecoilValue } from 'recoil';

import styled from 'styled-components';

import Header from '../Header';
import NavBar from '../Navbar';
import MindMapCard from '../MindMapCard';

import { errorInfo, mindMapListInfo } from '../../store/states';

import ErrorMessage from '../shared/ErrorMessage';

export default function MyWorks() {
  const mindMapList = useRecoilValue(mindMapListInfo);
  const errMessage = useRecoilValue(errorInfo);

  return (
    <Wrapper>
      <Header />
      <NavBar />
      <ErrorMessage>{errMessage}</ErrorMessage>
      <MindMapsWrapper>
        {mindMapList.map(mindMap => {
          return <MindMapCard key={mindMap.id} title={mindMap.title} />;
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
