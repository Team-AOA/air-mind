import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import zoomPanning from '../../utils/d3/zoomPanning';
import makeNodeComponentList from '../../utils/d3/makeNodeComponentList';
import { nodesInfo } from '../../store/states';

export default function NodeCanvas({ headNode }) {
  const groupRef = useRef();
  const wrapperRef = useRef();
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const [nodeComponentList, setNodeComponentList] = useState([]);

  useEffect(() => {
    zoomPanning(groupRef);
  }, []);

  useEffect(() => {
    if (nodeData && Object.keys(nodeData).length > 0) {
      setNodeComponentList(
        makeNodeComponentList(nodeData, setNodeData, headNode),
      );
    }
  }, [nodeData]);

  return (
    <Container ref={wrapperRef}>
      <SVG>
        <g ref={groupRef}>{nodeComponentList}</g>
      </SVG>
    </Container>
  );
}

NodeCanvas.propTypes = {
  headNode: PropTypes.string.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
`;

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;
