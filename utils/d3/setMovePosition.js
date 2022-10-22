import * as d3 from 'd3';

export default function setMovePosition(ref, x, y, selector, setNodeData) {
  const translateX = x;
  const translateY = y;

  const handleDrag = d3
    .drag()
    .subject(() => {
      d3.select(this);
      return { x: translateX, y: translateY };
    })
    .on('drag', d => {
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
    });

  handleDrag(ref);
}
