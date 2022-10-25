import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const GuestIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: gray;
`;

export default function ProfileIcon({ src, alt }) {
  const [hasUrl, setHasUrl] = useState(false);

  useEffect(() => {
    if (src !== 'guest') {
      setHasUrl(true);
    }
  }, []);

  return hasUrl ? <Icon src={src} alt={alt} /> : <GuestIcon>Guest</GuestIcon>;
}

ProfileIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
