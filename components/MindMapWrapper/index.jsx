import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

import NodeBox from '../NodeBox';

export default function MindMapWrapper() {
  const svgRef = useRef();
  const groupRef = useRef();

  useEffect(() => {
    const group = d3.select(groupRef.current);

    const handleZoom = e => group.attr('transform', e.transform);

    const zoom = d3.zoom().on('zoom', handleZoom);

    d3.select('svg').call(zoom);
  }, []);

  return (
    <Container>
      <SVG ref={svgRef}>
        <g ref={groupRef}>
          <NodeBox />
        </g>
      </SVG>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;
