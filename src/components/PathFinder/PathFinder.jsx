import Node from '../NodeComponent/Node';
import './PathFinder.css';

/*
  * PathFinder component represents the grid of nodes for pathfinding visualization.
  * It takes a grid of nodes and a callback function to handle node clicks.
  * 
*/

/*
  * Props:
  * grid: array - 2D array representing the grid of nodes
  * onNodeClick: function - function to call when a node is clicked
  * 
*/
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
