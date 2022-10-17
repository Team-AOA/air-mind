import React from 'react';

import styled from 'styled-components';

export default function MindMapCard() {
  return (
    <Card>
      <Thumbnail
        src="https://nulab.com/static/6127951160c31e3ed297bb12d2e2201e/2d083/mindmap.png"
        alt="mindmapThumb"
      />
      <Footer>
        <DocIcon>
          <img
            src="https://cdn-icons-png.flaticon.com/512/177/177256.png"
            alt="docIcon"
          />
        </DocIcon>
        <ShortInfo>
          <div className="infoTitle">Title</div>
          <div className="infoAuthor">Created by </div>
        </ShortInfo>
        <SettingButton>•••</SettingButton>
      </Footer>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  border: 1px solid black;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 90%;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 10%;
  padding: 3%;
`;

const DocIcon = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 50%;
  }
`;

const ShortInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: flex-start;

  .infoTitle {
    overflow: hidden;
  }
  .infoAuthor {
    font-size: 80%;
    overflow: hidden;
  }
`;

const SettingButton = styled.div`
  cursor: pointer;
  align-self: center;
  border-radius: 10%;
  background-color: #eeeeee;
`;
