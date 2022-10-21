import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from './Modal';

export default function MindMapCard({ title, author, access, headNode }) {
  console.log(author, access, headNode);
  const [modalRight, setModalRight] = useState(0);
  const [modalBottom, setModalBottom] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const card = useRef();
  const dotButton = useRef();

  useEffect(() => {
    setModalRight(
      card.current.getBoundingClientRect().right -
        dotButton.current.getBoundingClientRect().right +
        dotButton.current.getBoundingClientRect().width / 2,
    );
    setModalBottom(
      card.current.getBoundingClientRect().bottom -
        dotButton.current.getBoundingClientRect().bottom +
        dotButton.current.getBoundingClientRect().height / 2,
    );
  }, [dotButton]);

  const modalShowOn = () => {
    setModalShow(!modalShow);
  };

  return (
    <Card ref={card}>
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
          <div className="infoTitle">{title}</div>
          <div className="infoAuthor">{author}</div>
        </ShortInfo>
        <Option>
          <AccessIcon>{access}</AccessIcon>
          <DotButton ref={dotButton} onClick={modalShowOn}>
            •••
          </DotButton>
        </Option>
      </Footer>
      <TestModule />
      {modalShow &&
        Modal({ right: modalRight, bottom: modalBottom, setModalShow })}
    </Card>
  );
}

const TestModule = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0;
  top: 0;
`;

MindMapCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
  headNode: PropTypes.string.isRequired,
};

const Card = styled.div`
  position: relative;
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
  width: 65%;
  justify-content: flex-start;

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

const AccessIcon = styled.div`
  border-radius: 10%;
  background-color: #02bb02;
  border: 2px solid brown;
  font-size: 80%;
  color: black;
`;

const DotButton = styled.div`
  cursor: pointer;
  align-self: center;
  border-radius: 10%;
  background-color: #eeeeee;
`;
