import React from "react";

import styled from "styled-components";

import Header from "../Header";
import CommentBox from "../CommentBox";
import NodeBox from "../NodeBox"
import SearchBar from "../SearchBar";
import NodeDetail from "../NodeDetail";
import NodeButtonBox from "../NodeButtonBox";

export default function MindMap() {
  return (
    <MindMapWrapper>
      <Header />
      <SearchBar />
      <MindMapBody>
        <CommentBox />
        <NodeBox />
        <NodeButtonBox />
        <NodeDetail />
      </MindMapBody>
    </MindMapWrapper>
  );
}

const MindMapWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MindMapBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`;
