import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function NodeCoworkers({ x, y, socketUsers }) {
  return (
    <foreignObject x={x - 10} y={y + 30} width={150} height={150}>
      <Icons>
        {socketUsers.map(profile => {
          return (
            <Icon
              key={profile}
              className="profileIcon"
              src={profile}
              art="currentUserLocation"
            />
          );
        })}
        {socketUsers.map(profile => {
          return (
            <Icon
              key={profile}
              className="profileIcon"
              src={profile}
              art="currentUserLocation"
            />
          );
        })}
      </Icons>
    </foreignObject>
  );
}

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  max-width: 150px;
  height: 50px;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

NodeCoworkers.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  socketUsers: PropTypes.object.isRequired,
};
