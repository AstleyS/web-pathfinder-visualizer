// Breadth-First Search
export const bfs = (grid, startNode, finishNode) =>{
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const queue = [startNode];
    const visited = new Set();
    
    while (queue.length) {
      const currentNode = queue.shift();
      if (visited.has(`${currentNode.row}-${currentNode.col}`)) continue;
      
      visited.add(`${currentNode.row}-${currentNode.col}`);
      visitedNodesInOrder.push(currentNode);
      
      if (currentNode === finishNode) return visitedNodesInOrder;
      
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!visited.has(`${neighbor.row}-${neighbor.col}`)) {
          neighbor.distance = currentNode.distance + 1;
          neighbor.previousNode = currentNode;
          queue.push(neighbor);
        }
      }
    }
    
    return visitedNodesInOrder;
  };

// Depth-First Search
export const dfs = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    const visited = new Set();
    
    function dfsHelper(node) {
      if (visited.has(`${node.row}-${node.col}`)) return false;
      
      visited.add(`${node.row}-${node.col}`);
      visitedNodesInOrder.push(node);
      
      if (node === finishNode) return true;
      
      const neighbors = getNeighbors(node, grid);
      for (const neighbor of neighbors) {
        neighbor.previousNode = node;
        if (dfsHelper(neighbor)) return true;
      }
      
      return false;
    }
    
    dfsHelper(startNode);
    return visitedNodesInOrder;
  };

  // Dijkstra's Algorithm
export const dijkstra = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    
    while (unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      
      // If the closest node is a wall, skip it
      if (closestNode.isWall) continue;
      
      // If we cannot reach the end node, we must be trapped
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      
      if (closestNode === finishNode) return visitedNodesInOrder;
      
      updateUnvisitedNeighbors(closestNode, grid);
    }
    
    return visitedNodesInOrder;
  };

  // A* Search
  export const aStar = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.heuristic = calculateManhattanDistance(startNode, finishNode);
    startNode.totalDistance = startNode.heuristic;
    const unvisitedNodes = [startNode];
    const visitedNodesSet = new Set();
    
    while (unvisitedNodes.length) {
      sortNodesByTotalDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      
      // If the closest node is a wall, skip it
      if (closestNode.isWall) continue;
      
      // If we cannot reach the end node, we must be trapped
      if (closestNode.totalDistance === Infinity) return visitedNodesInOrder;
      
      visitedNodesSet.add(`${closestNode.row}-${closestNode.col}`);
      visitedNodesInOrder.push(closestNode);
      
      if (closestNode === finishNode) return visitedNodesInOrder;
      
      const neighbors = getNeighbors(closestNode, grid);
      for (const neighbor of neighbors) {
        if (visitedNodesSet.has(`${neighbor.row}-${neighbor.col}`)) continue;
        
        const tentativeDistance = closestNode.distance + 1;
        
        if (!unvisitedNodes.includes(neighbor)) {
          neighbor.distance = tentativeDistance;
          neighbor.heuristic = calculateManhattanDistance(neighbor, finishNode);
          neighbor.totalDistance = neighbor.distance + neighbor.heuristic;
          neighbor.previousNode = closestNode;
          unvisitedNodes.push(neighbor);
        } else if (tentativeDistance < neighbor.distance) {
          neighbor.distance = tentativeDistance;
          neighbor.totalDistance = neighbor.distance + neighbor.heuristic;
          neighbor.previousNode = closestNode;
        }
      }
    }
    
    return visitedNodesInOrder;
  };

    // Utility functions
  const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
    
    return neighbors.filter(neighbor => !neighbor.isWall);
  };

    const calculateManhattanDistance = (nodeA, nodeB) => {
      return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
    };
  
    const getAllNodes = (grid) => {
      const nodes = [];
      for (const row of grid) {
        for (const node of row) {
          nodes.push(node);
        }
      }
      return nodes;
    };
  
    const sortNodesByDistance = (unvisitedNodes) => {
      unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    };
  
    const sortNodesByTotalDistance = (unvisitedNodes) => {
      unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance);
    };
  
    const updateUnvisitedNeighbors = (node, grid) => {
      const neighbors = getNeighbors(node, grid);
      for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
      }
    };

// Export a dictionary (object) with algorithm names as keys
const ALGORITHMS = {
  Dijkstra: dijkstra,
  BFS: bfs,
  DFS: dfs,
  ASTAR: aStar,
};

// Algorithms
export const ALGORITHMS_NAMES = {
  BFS: "Breadth-First Search",
  DFS: "Depth-First Search",
  DIJKSTRA: "Dijkstra's Algorithm",
  ASTAR: "A* Search"
};

export default ALGORITHMS;

