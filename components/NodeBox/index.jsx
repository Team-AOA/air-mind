import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';

function makeDraggable(ref, position, setPosition) {
  let translateX = position.x;
  let translateY = position.y;

  const handleDrag = d3
    .drag()
    .subject(() => {
      return { x: translateX, y: translateY };
    })
    .on('drag', d => {
      const me = d3.select(this);
      translateX = d.x;
      translateY = d.y;
      setPosition(prev => ({
        ...prev,
        x: d.x,
        y: d.y,
      }));
      me.attr('x', translateX);
      me.attr('y', translateY);
    });

  handleDrag(ref);
}

function ChildRectLine({ parentPosition }) {
  const lineRef = useRef();

  const [childPosition, setChildPosition] = useState({
    x: parentPosition.x + 50,
    y: parentPosition.y + 100,
    width: parentPosition.width,
    height: parentPosition.height,
  });

  useEffect(() => {
    const line = d3.select(lineRef.current);
    const parentCenter = [
      parentPosition.x + parentPosition.width / 2,
      parentPosition.y + parentPosition.height / 2,
    ];
    const childCenter = [
      childPosition.x + childPosition.width / 2,
      childPosition.y + childPosition.height / 2,
    ];
    line
      .attr('x1', parentCenter[0])
      .attr('y1', parentCenter[1])
      .attr('x2', childCenter[0])
      .attr('y2', childCenter[1]);
  }, [parentPosition, childPosition]);

  return (
    <>
      <Rect
        x={childPosition.x}
        y={childPosition.y}
        width={childPosition.width}
        height={childPosition.height}
        position={childPosition}
        setPosition={setChildPosition}
      />
      <line ref={lineRef} style={{ stroke: 'red' }} />
    </>
  );
}

function Rect({ x, y, width, height, position, setPosition }) {
  const rectRef = useRef();

  useEffect(() => {
    const rect = d3.select(rectRef.current);
    makeDraggable(rect, position, setPosition);
  }, []);

  return <rect ref={rectRef} x={x} y={y} width={width} height={height} />;
}

export default function Test() {
  const [parentPosition, setParentPosition] = useState({
    x: 30,
    y: 30,
    width: 50,
    height: 50,
  });

  return (
    <svg style={{ border: '1px solid' }} width={500} height={500}>
      <Rect
        x={parentPosition.x}
        y={parentPosition.y}
        width={parentPosition.width}
        height={parentPosition.height}
        position={parentPosition}
        setPosition={setParentPosition}
      />
      <ChildRectLine parentPosition={parentPosition} />
    </svg>
  );
}

ChildRectLine.propTypes = {
  parentPosition: PropTypes.node.isRequired,
};

Rect.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  width: PropTypes.node.isRequired,
  height: PropTypes.node.isRequired,
  position: PropTypes.node.isRequired,
  setPosition: PropTypes.node.isRequired,
};
