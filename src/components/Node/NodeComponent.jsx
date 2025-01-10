import React from 'react';
import './Node.css';

const NodeComponent = ({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
  const { isStart, isFinish, isWall } = node;

  const extraClassName = isStart
    ? 'node-start' : isFinish
    ? 'node-finish' : isWall
    ? 'node-wall' : '';

  return (
    <div
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(node)}
      onMouseEnter={() => onMouseEnter(node)}
      onMouseUp={onMouseUp}
    ></div>
  );
};

export default NodeComponent;
