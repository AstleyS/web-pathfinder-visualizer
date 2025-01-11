export const bfs = (grid, setGrid, nodeStart, nodeFinish) => {
    const visitedNodesInOrder = [];
    const queue = [nodeStart];
    const newGrid = grid.map(row => row.slice()); // Create a new grid to avoid direct mutation
  
    nodeStart.isVisited = true;
    
    while (queue.length) {
      const currentNode = queue.shift();
  
      // If we find the finish node, stop the search
      if (currentNode === nodeFinish) {
        break;
      }
  
      const neighbors = getNeighbors(currentNode, newGrid);
      
      for (let neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.isVisited = true;
          neighbor.previousNode = currentNode;
          queue.push(neighbor);
          visitedNodesInOrder.push(neighbor);
        }
      }
  
      // Visualization update (optional)
      setGrid(newGrid);
    }
  
    // Visualization of path from finish to start
    const shortestPath = [];
    let currentNode = nodeFinish;
    while (currentNode) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    // Animate visited nodes and the shortest path
    animateAlgorithm(visitedNodesInOrder, shortestPath, setGrid, newGrid);
  };
  
  // Helper function to get neighbors (up, down, left, right)
  const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
  
    const boundRow = grid.length;
    const boundCol = grid[0].length;
  
    // Up
    if (row > 0) neighbors.push(grid[row - 1][col]);
    // Down
    if (row < boundRow - 1) neighbors.push(grid[row + 1][col]);
    // Left
    if (col > 0) neighbors.push(grid[row][col - 1]);
    // Right
    if (col < boundCol - 1) neighbors.push(grid[row][col + 1]);
  
    return neighbors;
  };
  
  // Animation function to visualize visited nodes and the shortest path
  const animateAlgorithm = (visitedNodesInOrder, shortestPath, setGrid, grid) => {
    let speed = 50; // Adjust speed to your preference
    let newGrid = grid.map(row => row.slice()); // Copy the grid for updates
  
    // Animate visited nodes
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        node.isVisited = true; // Mark node as visited
        newGrid[node.row][node.col] = node; // Update the node on the grid
        setGrid(newGrid); // Update grid state
      }, speed * i);
    }
  
    // Animate the shortest path
    setTimeout(() => {
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          node.isPath = true; // Mark node as part of the shortest path
          newGrid[node.row][node.col] = node; // Update the node on the grid
          setGrid(newGrid); // Update grid state
        }, speed * (i + visitedNodesInOrder.length));
      }
    }, speed * visitedNodesInOrder.length);
  };
  


export const dfs = (grid, setGrid, nodeStart, nodeFinish) => {

};

export const dijkstra = (grid, setGrid, nodeStart, nodeFinish) => {

};


export const aStar = (grid, setGrid, nodeStart, nodeFinish) => {

};

