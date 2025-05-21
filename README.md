# PathFinder Visualizer

This is a PathFinder Visualizer built with **React** and **Vite**. It allows users to visualize various pathfinding algorithms in an interactive and intuitive way.

## Key Features

- **Interactive Grid**:
  - Place the **starting node** (green)
  - Place the **ending node** (red)
  - Create walls by clicking on grid cells

- **Pathfinding Algorithms**:
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Dijkstra's Algorithm
  - A* Search

- **Visualization Controls**:
  - Speed selector: Slow, Medium, Fast
  - "Visualize!" button, which becomes "Stop/Reset" during animations
  - "Clear All" button to reset the entire grid

- **Visual Indicators**:
  - Start node: Green
  - Finish node: Red
  - Walls: Dark gray/black
  - Visited nodes: Blue
  - Final path: Yellow

## How to Use

1. **Select an algorithm** from the dropdown menu.
2. **Set the visualization speed** using the speed selector.
3. **Choose what to place** (walls, start node, or finish node) from the "Place" dropdown.
4. **Click on the grid** to place your selection.
5. Click **"Visualize!"** to start the animation.
6. During visualization, click **"Stop/Reset"** to stop the animation.
7. Click **"Clear All"** to reset the entire grid and start over.

This tool helps visualize how different pathfinding algorithms work by showing node traversal in real-time and highlighting the shortest path found from the start to the finish node.

## Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/web-pathfinder-visualizer.git
cd web-pathfinder-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
