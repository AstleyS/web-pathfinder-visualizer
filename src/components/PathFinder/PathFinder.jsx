import React from 'react';
import Node from '../NodeComponent/Node';
import './PathFinder.css';

export default function PathFinder({ grid, onNodeClick }) {
  return (
    <div className="pathfinder-container">
      <div className="pathfinder-grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="pathfinder-row">
            {row.map((node, nodeIdx) => {
              const { 
                row, 
                col, 
                isStart, 
                isFinish, 
                isWall, 
                isVisited, 
                isPath 
              } = node;
              
              return (
                <Node 
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isFinish={isFinish}
                  isWall={isWall}
                  isVisited={isVisited}
                  isPath={isPath}
                  onClick={() => onNodeClick(row, col)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
