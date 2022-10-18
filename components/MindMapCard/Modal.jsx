import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export default function Modal({ right, bottom, setModalShow }) {
  const modalShowOff = () => {
    setModalShow(false);
  };

  return (
    <>
      <ModalBackground onClick={modalShowOff} />
      <ModalContents style={{ right, bottom }}>
        <div className="options">Open</div>
        <div className="options">Rename</div>
        <div className="options">Make public</div>
        <div className="options">Delete</div>
      </ModalContents>
    </>
  );
}

Modal.propTypes = {
  right: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  setModalShow: PropTypes.func.isRequired,
};

const ModalContents = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dddddd;
  z-index: 2;

  .options {
    text-align: center;
    width: 100%;
  }

  .options:hover {
    cursor: pointer;
    border-radius: 10%;
    background-color: #bbbbbb;
    color: #fab004;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
