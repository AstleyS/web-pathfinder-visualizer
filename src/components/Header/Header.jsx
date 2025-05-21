import { NODE_TYPES } from "../../constant";
import "./Header.css";

/*
  * Header component for the Path Finding Visualizer.
  * Displays the title, algorithm, speed selection.
  * Includes buttons to visualize the algorithm and clear the grid.
  * Also shows a legend for different node types.
  *
*/

/*
  * Props:
  * algorithms: Object containing available algorithms.
  * speeds: Object containing available speeds.
  * algorithm: Currently selected algorithm.
  * speed: Currently selected speed.
  * isVisualizing: Boolean indicating if visualization is in progress.
  * setAlgorithm: Function to set the selected algorithm.
  * setSpeed: Function to set the selected speed.
  * visualizeAlgorithm: Function to start the visualization.
  * currentSelection: Currently selected node type for placement.
  * setCurrentSelection: Function to set the selected node type.
  * resetFullGrid: Function to reset the grid.
  * 
*/

export default function Header({ 
  algorithms, 
  speeds, 
  algorithm, 
  speed, 
  isVisualizing, 
  setAlgorithm, 
  setSpeed, 
  visualizeAlgorithm,
  currentSelection,
  setCurrentSelection,
  resetFullGrid
}) {
  return (
    <div className="header">
      <div className="header-top">
        <div className="header-title">Path Finding Visualizer</div>
        
        <div className="header-controls">
          <div className="control-group">
            <label htmlFor="algorithm">Algorithm:</label>
            <select 
              id="algorithm"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isVisualizing}
              className="select"
            >
              {Object.entries(algorithms).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label htmlFor="speed">Speed:</label>
            <select 
              id="speed"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isVisualizing}
              className="select"
            >
              {Object.entries(speeds).map(([key, { label, value }]) => (
                <option key={key} value={value}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label htmlFor="selection">Place:</label>
            <select 
              id="selection"
              value={currentSelection}
              onChange={(e) => setCurrentSelection(e.target.value)}
              disabled={isVisualizing}
              className="select"
            >
              <option value={NODE_TYPES.WALL}>Walls</option>
              <option value={NODE_TYPES.START}>Start Node</option>
              <option value={NODE_TYPES.FINISH}>Finish Node</option>
            </select>
          </div>
          
          <button 
            onClick={visualizeAlgorithm} 
            className={`btn ${isVisualizing ? 'btn-stop' : 'btn-start'}`}
          >
            {isVisualizing ? 'Stop/Reset' : 'Visualize!'}
          </button>
          
          <button 
            onClick={resetFullGrid}
            disabled={isVisualizing}
            className="btn btn-clear"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="legend">
        <div className="legend-item"><div className="box start"></div><span>Start Node</span></div>
        <div className="legend-item"><div className="box finish"></div><span>Finish Node</span></div>
        <div className="legend-item"><div className="box wall"></div><span>Wall</span></div>
        <div className="legend-item"><div className="box visited"></div><span>Visited Node</span></div>
        <div className="legend-item"><div className="box path"></div><span>Shortest Path</span></div>
      </div>
    </div>
  );
}
