import * as d3 from 'd3';

export default function setMovePosition(ref, x, y, selector, setNodeData) {
  let translateX = x;
  let translateY = y;

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
      setNodeData(prev => {
        const temp = { ...prev };
        const tempSel = { ...prev[selector] };
        tempSel.attribute = {
          ...tempSel.attribute,
          cordX: d.x,
          cordY: d.y,
        };
        temp[selector] = tempSel;
        return temp;
      });
      me.attr('x', translateX);
      me.attr('y', translateY);
    });

  handleDrag(ref);
}
