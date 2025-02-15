import React from 'react';
import './NodeComponent.css';

/*
  NodeComponent is a functional component that represents a single node in the grid.
  The node can be of type start, finish, or wall, and has event handlers for mouse events.
*/

const NodeComponent = ({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
  const { isStart, isFinish, isWall } = node;

  const extraClassName = isStart
    ? 'node-start' : isFinish
    ? 'node-finish' : isWall
    ? 'node-wall' : '';

  return (
    <div
      className={`node ${extraClassName}`} // Add extra class name based on node type
      onMouseDown={() => onMouseDown(node)}
      onMouseEnter={() => onMouseEnter(node)}
      onMouseUp={onMouseUp}
    ></div>
  );
};

export default NodeComponent;
