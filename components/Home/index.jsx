import React from 'react';

import styled from 'styled-components';

import Header from '../Header';
import NavBar from '../Navbar';
import MindMapCard from '../MindMapCard';

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <NavBar />
      <MindMapsWrapper>
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
        <MindMapCard />
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
