import { useState, useEffect, useRef } from 'react';
import './App.css';

import Header from './components/Header/Header';
import PathFinder from './components/PathFinder/PathFinder';

import ALGORITHMS, { ALGORITHMS_NAMES } from './algorithms/algorithms';
import { ROWS, COLS, SPEEDS, NODE_TYPES } from './constant';

export default function App() {
  const [grid, setGrid] = useState([]);
  const [algorithm, setAlgorithm] = useState("BFS");
  const [speed, setSpeed] = useState(SPEEDS.MEDIUM.value);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [startNode, setStartNode] = useState({ row: 10, col: 5 });
  const [finishNode, setFinishNode] = useState({ row: 10, col: 29 });
  const [currentSelection, setCurrentSelection] = useState(NODE_TYPES.WALL);
  
  const animationTimers = useRef([]);
  
  // Initialize the grid
  useEffect(() => {
    initializeGrid();
  }, []);

  // Reset animation timers when component unmounts
  useEffect(() => {
    return () => {
      animationTimers.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const initializeGrid = () => {
    const newGrid = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === startNode.row && col === startNode.col,
          isFinish: row === finishNode.row && col === finishNode.col,
          isWall: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          previousNode: null
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
  };

  const handleNodeClick = (row, col) => {
    if (isVisualizing) return;
    
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    
    // Reset any previous nodes of the same type
    if (currentSelection === NODE_TYPES.START) {
      newGrid[startNode.row][startNode.col].isStart = false;
      node.isStart = true;
      setStartNode({ row, col });
    } else if (currentSelection === NODE_TYPES.FINISH) {
      newGrid[finishNode.row][finishNode.col].isFinish = false;
      node.isFinish = true;
      setFinishNode({ row, col });
    } else if (currentSelection === NODE_TYPES.WALL) {
      // Toggle wall
      node.isWall = !node.isWall;
    }
    
    setGrid(newGrid);
  };

  const resetGrid = () => {
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    
    const newGrid = grid.map(row => 
      row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null
      }))
    );
    
    setGrid(newGrid);
    setIsVisualizing(false);
  };

  const resetFullGrid = () => {
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    initializeGrid();
    setIsVisualizing(false);
  };

  const visualizeAlgorithm = () => {
    if (isVisualizing) {
      resetGrid();
      return;
    }
    
    resetGrid();
    setIsVisualizing(true);
    
    const startNodeObj = grid[startNode.row][startNode.col];
    const finishNodeObj = grid[finishNode.row][finishNode.col];
  

    const algoFunc = ALGORITHMS[algorithm] || ALGORITHMS["BFS"];
    const visitedNodesInOrder = algoFunc(grid, startNodeObj, finishNodeObj);
    
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNodeObj);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        const timer = setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, speed * i);
        animationTimers.current.push(timer);
        return;
      }
      
      const timer = setTimeout(() => {
        const node = visitedNodesInOrder[i];
        setGrid(prevGrid => {
          const newGrid = [...prevGrid];
          const newNode = {
            ...newGrid[node.row][node.col],
            isVisited: true
          };
          newGrid[node.row][node.col] = newNode;
          return newGrid;
        });
      }, speed * i);
      
      animationTimers.current.push(timer);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const timer = setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        setGrid(prevGrid => {
          const newGrid = [...prevGrid];
          const newNode = {
            ...newGrid[node.row][node.col],
            isPath: true
          };
          newGrid[node.row][node.col] = newNode;
          return newGrid;
        });
        
        if (i === nodesInShortestPathOrder.length - 1) {
          setIsVisualizing(false);
        }
      }, speed * i);
      
      animationTimers.current.push(timer);
    }
  };

  const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  };

  return (
  <div className="app-container">
    <div className="app-content">
      <Header 
        algorithms={ALGORITHMS_NAMES}
        speeds={SPEEDS}
        algorithm={algorithm}
        speed={speed}
        isVisualizing={isVisualizing}
        setAlgorithm={setAlgorithm}
        setSpeed={setSpeed}
        visualizeAlgorithm={visualizeAlgorithm}
        currentSelection={currentSelection}
        setCurrentSelection={setCurrentSelection}
        resetFullGrid={resetFullGrid}
      />
      
      <div className="pathfinder-wrapper">
        <PathFinder 
          grid={grid}
          onNodeClick={handleNodeClick}
        />
      </div>
    </div>
  </div>
  );
}



