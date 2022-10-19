import * as d3 from 'd3';

export default function setMovePosition(ref, position, setPosition) {
  let translateX = position.x;
  let translateY = position.y;

  const handleDrag = d3
    .drag()
    .subject(() => {
      d3.select(this);
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
