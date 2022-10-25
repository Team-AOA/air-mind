import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Router, { useRouter } from 'next/router';
import Thumbnail from 'react-webpage-thumbnail';

import { CgFileDocument as DocumentIcon } from 'react-icons/cg';
import { TbShieldLock as LockIcon } from 'react-icons/tb';
import { mindMapInfo, userInfo, currentUserInfo } from '../../store/states';
import { deleteMindMapData } from '../../service/mindMapRequests';
import { DELETE_CONFIRM } from '../../constants/constants';

export default function MindMapCard({ mindMap, renameTitleHandler }) {
  const [title, setTitle] = useState(mindMap.title);
  const [istitleEditMode, setIsTitleEditMode] = useState(false);
  const inputRef = useRef();
  const router = useRouter();
  const setUserData = useSetRecoilState(userInfo);
  const currentUser = useRecoilValue(currentUserInfo);
  const setMindMapData = useSetRecoilState(mindMapInfo);
  const [modalShow, setModalShow] = useState(false);
  const [url, setUrl] = useState('');
  const { _id: mindMapId } = mindMap;

  useEffect(() => {
    if (!mindMap) return;

    setMindMapData(mindMap);
    setUrl(`${process.env.NEXT_PUBLIC_CLIENT_URL}/mind-map/${mindMapId}`);
  }, [mindMap]);

  const modalShowOn = () => {
    setModalShow(!modalShow);
  };

  const mindMapLoader = () => {
    setMindMapData(mindMap);

    if (!mindMap) return;

    setUserData(mindMap.author);
    Router.push(`/mind-map/${mindMapId}`);
  };

  const deleteHandler = async () => {
    setModalShow(!modalShow);

    if (!mindMap) return;

    const confirmCheck = window.confirm(DELETE_CONFIRM);

    if (!confirmCheck) {
      return;
    }

    try {
      await deleteMindMapData(mindMap.author, mindMapId);
    } catch (error) {
      console.log(error);
    }

    router.reload('/');
  };

  const renameHandler = () => {
    inputRef.current.focus();

    setIsTitleEditMode(true);
    setModalShow(!modalShow);
  };

  const renameSubmitHandler = e => {
    e.preventDefault();
    setIsTitleEditMode(false);

    const { _id: authorId } = mindMap.author;
    if (currentUser.id !== authorId) return;

    renameTitleHandler(authorId, mindMapId, title);
  };

  return (
    <Card>
      <Wrapper onClick={mindMapLoader}>
        {mindMap.access === 'private' ? (
          <LockPageWrapper>
            <LockIcon className="lockIcon" size={50} />
            <PrivatePageThumbnail />
          </LockPageWrapper>
        ) : (
          <Thumbnail url={url} className="thumbnail" />
        )}
      </Wrapper>
      <Footer>
        <FoooterLeft>
          <ShortInfo>
            <DocumentIcon size={25} className="documentIcon" />
            <form type="submit">
              <TitleInput
                ref={inputRef}
                value={title}
                onChange={e => setTitle(e.target.value)}
                readOnly={!istitleEditMode}
              />
              {istitleEditMode && (
                <TitleButton type="submit" onClick={renameSubmitHandler}>
                  ✔
                </TitleButton>
              )}
            </form>
          </ShortInfo>
          <div className="infoAuthor">{mindMap.author?.userName}</div>
        </FoooterLeft>
        <OptionModal>
          {modalShow && (
            <OptionMenu>
              <Menu className="open" onClick={mindMapLoader}>
                Open
              </Menu>
              <Menu onClick={renameHandler}>Rename</Menu>
              <Menu className="delete" onClick={deleteHandler}>
                Delete
              </Menu>
            </OptionMenu>
          )}
          <BottomButton>
            <AccessIcon access={mindMap.access}>{mindMap.access}</AccessIcon>
            <DotButton onClick={modalShowOn}>•••</DotButton>
          </BottomButton>
        </OptionModal>
      </Footer>
    </Card>
  );
}

MindMapCard.propTypes = {
  mindMap: PropTypes.object.isRequired,
  renameTitleHandler: PropTypes.func.isRequired,
};

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 300px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  padding: 10px;
  z-index: 0;

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const Wrapper = styled.div`
  width: 300px;
  height: 100%;
  cursor: pointer;
`;

const LockPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: inherit;
  height: 100%;
  color: white;

  .lockIcon {
    position: absolute;
    z-index: 1;
  }
`;

const PrivatePageThumbnail = styled.div`
  width: inherit;
  height: inherit;
  background-image: linear-gradient(to right, #8e2de2, #4a00e0);
  position: relative;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 90%;
  height: 10%;
  margin: 10px;
`;

const FoooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  height: 100%;

  .documentIcon {
    margin-right: 5px;
  }

  .infoAuthor {
    margin-left: 30px;
    color: gray;
    font-size: 13px;
  }
`;

const ShortInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .infoTitle {
    overflow: hidden;
  }
  .infoAuthor {
    font-size: 80%;
    overflow: hidden;
  }
`;

const TitleInput = styled.input`
  height: 20px;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  margin: 3px 0;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const TitleButton = styled.button`
  margin-left: 3px;
  width: 25px;
  height: 23px;
  border: none;
  background-color: none;
  z-index: 10;
  cursor: pointer;
`;

const OptionModal = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
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
  background-color: ${props =>
    props.access === 'private' ? 'red' : 'royalBlue'};
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
