import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import Router, { useRouter } from 'next/router';
import Thumbnail from 'react-webpage-thumbnail';
import { CgFileDocument as DocumentIcon } from 'react-icons/cg';
import { mindMapInfo, userInfo } from '../../store/states';
import { deleteMindMapData } from '../../service/mindMapRequests';

export default function MindMapCard({ mindMap }) {
  const router = useRouter();
  const setUserData = useSetRecoilState(userInfo);
  const setMindMapData = useSetRecoilState(mindMapInfo);
  const [modalShow, setModalShow] = useState(false);
  const [url, setUrl] = useState('');
  const { _id: mindMapId } = mindMap;

  useEffect(() => {
    if (!mindMap) return;

    setMindMapData(mindMap);
    setUrl(`${process.env.NEXT_PUBLIC_CLIENT_URL}mind-map/${mindMapId}`);
  }, [mindMap]);

  const modalShowOn = () => {
    setModalShow(!modalShow);
  };

  const mindMapLoader = () => {
    if (!mindMap) return;
    setMindMapData(mindMap);

    setUserData(mindMap.author);
    Router.push(`/mind-map/${mindMapId}`);
  };

  const deleteHandler = async () => {
    setModalShow(!modalShow);
    if (!mindMap) return;

    try {
      await deleteMindMapData(mindMap.author, mindMapId);
    } catch (error) {
      console.log(error);
    }

    router.reload('/');
  };

  return (
    <Card>
      <Wrapper onClick={mindMapLoader}>
        <Thumbnail url={url} className="thumbnail" />
      </Wrapper>
      <Footer>
        <Left>
          <DocumentIcon size={30} className="documentIcon" />
          <ShortInfo onClick={mindMapLoader}>
            <div className="infoTitle">{mindMap.title}</div>
            <div className="infoAuthor">{mindMap.author?.userName}</div>
          </ShortInfo>
        </Left>
        <Option>
          {modalShow && (
            <OptionMenu>
              <Menu className="open" onClick={mindMapLoader}>
                Open
              </Menu>
              <Menu>Rename</Menu>
              <Menu className="delete" onClick={deleteHandler}>
                Delete
              </Menu>
            </OptionMenu>
          )}
          <BottomButton>
            <AccessIcon>{mindMap.access}</AccessIcon>
            <DotButton onClick={modalShowOn}>•••</DotButton>
          </BottomButton>
        </Option>
      </Footer>
    </Card>
  );
}

MindMapCard.propTypes = {
  mindMap: PropTypes.object.isRequired,
};

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 300px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
  z-index: 0;

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const Wrapper = styled.div`
  width: 300px;
  height: 100%;
`;

const Footer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  height: 10%;
  margin: 10px;
`;

const Left = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .documentIcon {
    margin-right: 3px;
  }
`;

const ShortInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .infoTitle {
    overflow: hidden;
  }
  .infoAuthor {
    font-size: 80%;
    overflow: hidden;
  }
`;

const Option = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OptionMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
  transform: translate(-30px, -70px);
  z-index: 100;

  .open {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .delete {
    border-bottom: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &:hover {
      background-color: red;
      color: white;
    }
  }
`;

const Menu = styled.div`
  width: inherit;
  height: inherit;
  padding: 5px 0;
  border-bottom: 1px solid black;
  transition: all 0.5s;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const BottomButton = styled.div`
  display: flex;
  transform: translateX(-10px);
`;

const AccessIcon = styled.div`
  border-radius: 10%;
  background-color: royalBlue;
  border: 2px solid brown;
  padding: 0 5px;
  font-size: 80%;
  color: white;
`;

const DotButton = styled.div`
  cursor: pointer;
  align-self: center;
  border-radius: 10%;
  background-color: #eeeeee;

  &:hover {
    background-color: rgb(255, 245, 209);
  }
`;
