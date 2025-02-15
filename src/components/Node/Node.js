/*
  Node class to represent each cell in the grid. Each node has a row and column index, and can be of type start, finish, or empty.  
  The node also keeps track of its previous node, cost, heuristic, and total cost.
*/

class Node {
    constructor(col, row, isStart = false, isFinish = false) {
      this.col = col;
      this.row = row;
      this.isStart = isStart;
      this.isFinish = isFinish;
      this.previous = null;
      this.cost = Infinity;
      this.heuristic = Infinity;
      this.totalCost = Infinity;
    }
  
    // Resets the node to its initial state, retaining its position and type
    reset() {
      this.previous = null;
      this.cost = Infinity;
      this.heuristic = Infinity;
      this.totalCost = Infinity;
    }
  
    // Helper method to update costs
    updateCosts(cost, heuristic) {
      this.cost = cost;
      this.heuristic = heuristic;
      this.totalCost = cost + heuristic;
    }
  }

  export default Node;
  