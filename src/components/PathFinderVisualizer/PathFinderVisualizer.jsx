import React, { useEffect, useState } from 'react';
import NodeComponent from '../../components/Node/NodeComponent';
import Node from '../../components/Node/Node';

const ROW = 50
const COL = 50
const algorithms = ['BFS', 'DFS', 'Dijkstra', 'A*']

function generateGrid(rows, cols) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        const isStart = false
        const isFinish = false
        currentRow.push(new Node(col, row, isStart, isFinish));
      }
      grid.push(currentRow);
    }
    return grid;
}

const PathFinderVisualizer = ({algo, isAddingWalls, clearWalls, setClearWalls, reset}) => {
  const [grid, setGrid] = useState(generateGrid(ROW, COL)); 
  const [isMousePressed, setMousePressed] = useState(false);

  useEffect(() => {
    setGrid(generateGrid(ROW, COL))
  }, [reset])

  useEffect(() => {
    if (clearWalls) {
      const newGrid = grid.map(row =>
            row.map(node => {
                node.isWall = false;
                return node; // Return the modified node
            })
      );
  
      setGrid(newGrid);
      setClearWalls(false);
    }
  }, [clearWalls, grid, setClearWalls]);

  const handleMouseDown = (node) => {

    if (isAlgoSelected) {
        if (isAddingWalls) {
            node.isWall = !node.isWall;
            setGrid([...grid]);
            setMousePressed(true);
        }
    }
  };

  const handleMouseEnter = (node) => {
    if (isAlgoSelected) {
        if (isAddingWalls) {
            if (!isMousePressed) return;
            node.isWall = !node.isWall;
            setGrid([...grid]);
        }
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
  };

  const isAlgoSelected = algorithms.includes(algo)

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((node, nodeIdx) => (
            <NodeComponent
              key={nodeIdx}
              node={node}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PathFinderVisualizer;
