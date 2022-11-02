import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function MindMapThumbnail({ title, url, width }) {
  const [screenSize, setScreenSize] = useState({});
  const [ratio, setRatio] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [timeOut, setTimeOut] = useState(1300);
  const containerRef = useRef(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeOut(0);
    }, 1500);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (!window) return;

    setScreenSize({
      width: window.screen.width,
      height: window.screen.height,
    });

    setRatio(width / screenSize.width);
  }, [containerRef.current?.offsetWidth]);

  const siteLoaded = () => {
    if (timeOut) {
      setIsLoading(!isLoading);
    }
  };

  return (
    <Container ref={containerRef}>
      <Wrapper scale={ratio || 1}>
        {isLoading && (
          <Loading scale={ratio || 1}>
            <span className={timeOut ? 'loader' : ''} />
          </Loading>
        )}
        <Thumbnail
          tabIndex="-1"
          title={title}
          src={url}
          allow="src"
          sandbox="allow-scripts allow-same-origin"
          width={screenSize.width}
          height={screenSize.height}
          scale={ratio || 1}
          onLoad={siteLoaded}
          interactive="false"
          loading="lazy"
        />
      </Wrapper>
    </Container>
  );
}

MindMapThumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

const Container = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: ${props => `translateY(${props.scale * -100}px)`};
`;

const Thumbnail = styled.iframe`
  display: block;
  position: absolute;
  border: none;
  border-radius: 0;
  pointer-events: none;
  transform-origin: ${props => `-${props.scale + 2}% ${props.scale * -100}px`};
  transform: ${props => `scale(${props.scale + 0.1})`};
  z-index: 1;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: ${props => `translateY(${props.scale * 100}px)`};
  width: 100%;
  height: 100%;
  opacity: 100;
  background-color: #f5f5f5;
  z-index: 2;

  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
