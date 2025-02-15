import React, { useEffect, useState } from 'react';
import NodeComponent from '../../components/Node/NodeComponent';
import Node from '../../components/Node/Node';
import { bfs, dfs, dijkstra, aStar } from '../../algorithms/algorithms';

const ROW = 50
const COL = 50
const algorithms = ['BFS', 'DFS', 'Dijkstra', 'A*']

// Map the algorithm name to the corresponding function
const algoFunction = {
  'BFS': bfs,
  'DFS': dfs,
  'Dijkstra': dijkstra,
  'A*': aStar,
}

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

const PathFinderVisualizer = ({
      algo, 
      isAddingWalls,
      isPlaying, setPlaying,
      clearWalls, setClearWalls,
      reset, setReset,
      nodeStart, setNodeStart,
      nodeFinish, setNodeFinish
}) => {
  const [grid, setGrid] = useState(generateGrid(ROW, COL)); 
  const [isMousePressed, setMousePressed] = useState(false);

  // UseEffect to catch when the clear walls button is clicked in the Header Component
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

  // UseEffect to catch when the play button is clicked in the Header Component
  useEffect(() => {
    
    //if(isPlaying) executeAlgorithm(algo)

  }, [isPlaying, algo])

  // UseEffect to catch when the reset button is clicked in the Header Component
  useEffect(() => {
    setGrid(generateGrid(ROW, COL));
    setReset(false);
    setNodeStart(null)
    setNodeFinish(null)
  }, [reset]);

  const executeAlgorithm = (algo) => {
    algoFunction[algo](grid, setGrid, nodeStart, nodeFinish, ROW, COL)
  } 

  /* 
    Handler for mouse down event
      MouseDown = when the mouse is pressed down on a node
      MouseEnter = when the mouse is moved over a node
      MouseUp = when the mouse is released
  */

  const handleMouseDown = (node) => {

    /*
      If the start node is not selected, set the node as the start node
      If the finish node is not selected, set the node as the finish node
    */
    if (!nodeStart) {
      setNodeStart(node);  
      node.isStart = true;
      setGrid([...grid]);  
      return;
    }

    if (!nodeFinish) {
        setNodeFinish(node);  
        node.isFinish = true;
        setGrid([...grid]);   
        return;
    }

    // If the start and finish nodes are selected, and an algorithm is selected, if the user is adding walls, toggle the wall
    if (nodeStart && nodeFinish && isAlgoSelected && isAddingWalls) {
        node.isWall = !node.isWall; 
        setGrid([...grid]);
        setMousePressed(true);
    }
  }

  const handleMouseEnter = (node) => {
    // If the mouse is not pressed, or the user is not adding walls, or the start and finish nodes are not selected, return nothing toogle the wall
    if (!isMousePressed || !isAddingWalls || !nodeStart || !nodeFinish) return;
    node.isWall = !node.isWall;
    setGrid([...grid]);
  }
  
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