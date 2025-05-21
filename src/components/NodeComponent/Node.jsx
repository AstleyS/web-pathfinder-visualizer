import './Node.css';

/*
  * Node component represents a single cell in the grid.
  * It can be a start node, finish node, wall, visited node, or part of the path.
  * It also handles click events to toggle the state of the node.
  * 
*/

/*
  * Props:
  * isStart: boolean - true if the node is the start node
  * isFinish: boolean - true if the node is the finish node
  * isWall: boolean - true if the node is a wall
  * isVisited: boolean - true if the node has been visited
  * isPath: boolean - true if the node is part of the path
  * onClick: function - function to call when the node is clicked
  *   
*/
export default function Node({isStart, isFinish, isWall, isVisited, isPath, onClick }) {
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
