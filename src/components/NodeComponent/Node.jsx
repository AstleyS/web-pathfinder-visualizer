import React from 'react';
import './Node.css';

export default function Node({ row, col, isStart, isFinish, isWall, isVisited, isPath, onClick }) {
  let className = 'node node-default';

  if (isStart) {
    className = 'node node-start';
  } else if (isFinish) {
    className = 'node node-finish';
  } else if (isWall) {
    className = 'node node-wall';
  } else if (isPath) {
    className = 'node node-path';
  } else if (isVisited) {
    className = 'node node-visited';
  }
  
  return (
    <div 
      className={className}
      onClick={onClick}
    />
  );
}
