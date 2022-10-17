import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export default function Modal({ right, bottom }) {
  console.log(right, bottom);
  return (
    <ModalBackground>
      <ModalContents style={{ right, bottom }}>
        <div>Open</div>
        <div>Rename</div>
        <div>Make public</div>
        <div>Delete</div>
      </ModalContents>
    </ModalBackground>
  );
}

Modal.propTypes = {
  right: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
};

const ModalContents = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  background-color: red;

  div:hover,
  div:focus,
  div:active {
    cursor: pointer;
  }
`;

const ModalBackground = styled.div``;
