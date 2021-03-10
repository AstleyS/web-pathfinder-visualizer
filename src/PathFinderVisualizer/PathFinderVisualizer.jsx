import React from 'react';
import './PathFinderVisualizer.css';
import Node from './Node/Node';
import NodeObj from './Node/NodeObj'
// Import the algorithm functions
import { bfsOrDfs } from '../algorithms/bfsOrDfs';
import { dijkstraAlgo } from '../algorithms/dijkstra';
import { aStarAlgo } from '../algorithms/aStar';

const ROW = 20;
const COLUMN = 30;

// Has to be less than columns
const START_X = 5;
// Has to be less than row
const START_Y = 5;

// Has to be less than columns
const FINISH_X = 8;
// Has to be less than row
const FINISH_Y = 8;

const SPEED = 50; // The less the more

export default class PathFinderVisualizer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nodes: []
        }
    }

    componentDidMount() {
        // Generate a grid with args1 rows and args2 columns 
        // and starting node in **coordinates** args3 
        // and ending node in **coordinates** args4 
        let nodes = generateGrid(ROW, COLUMN, [START_X, START_Y],[FINISH_X, FINISH_Y]);
        this.setState({nodes});
    }

    // This function resets the grid
    resetGrid() {
        // Reset any stylization
        let nodes = document.querySelectorAll('.node'); 
        nodes.forEach((node) => {
            if (node.style.background !== '') node.style.background = '';
        });

        // Not working properly
        // this.componentDidMount();
    }

    // This function handles the user click when choosing BFS
    bfs(grid, nodeS, nodeF) {
        // DIMENSION: 0 = ROW | 1 = COLUMN
        const dimension = [grid.length, grid[0].length];

        console.time("bfs");
        // This variable holds the result of the BFS algorithm visisted nodes
        // [0] = visited nodes [1] = found node
        const nodes = bfsOrDfs('BFS', dimension, nodeS, nodeF);
        console.timeEnd("bfs");
        
        animateAlgorithm(nodes[0]);
        
        if (nodes[1]) animatePath(nodes[0]); 
    }
    
    
    // This function handles the user click when choosing DFS
    dfs(grid, nodeS, nodeF) {
        // DIMENSION: 0 = ROW | 1 = COLUMN
        const dimension = [grid.length, grid[0].length];
        
        console.time("dfs");
        // This variable holds the result of the DFS algorithm visisted nodes
        const nodes = bfsOrDfs('DFS', dimension, nodeS, nodeF);
        console.timeEnd("dfs");

        animateAlgorithm(nodes[0]);
        
        if (nodes[1]) animatePath(nodes[0]); 
    }
    
    // This function handles the user click when choosing Dijsktra
    dijsktra(grid, nodeS, nodeF) {
        const dimension = [grid.length, grid[0].length];

        dijkstraAlgo(dimension, nodeS, nodeF);
        console.log({nodeF});
    }
    
    // This function handles the user click when choosing A*
    aStar(grid, nodeS, nodeF) {
        const dimension = [grid.length, grid[0].length];
        aStarAlgo(dimension, nodeS, nodeF);
    }

    render() {
        // Getting the nodes/grid
        const {nodes} = this.state;
        let nodeS;
        let nodeF;
        console.log({nodes})
        return (
           <div className="grid">
               {
                  nodes.map((row, rIndex) => {
                      return <div key={rIndex} className="grid-row">
                        {
                          row.map((node, nodeIndex) => {
                            const { isStart, isFinish, col, row} = node;
                            if (isStart) nodeS = node;
                            if (isFinish) nodeF = node;
                            return <Node  
                                coordinates={`${col},${row}`} key={nodeIndex}
                                isStart = {isStart} isFinish = {isFinish}
                            ></Node>
                          })
                        }
                        </div>
                    })
               }
               <div className="buttons">
                   <button onClick={() => this.bfs(nodes, nodeS, nodeF)}>BFS</button>
                   <button onClick={() => this.dfs(nodes, nodeS, nodeF)}>DFS</button>
                   <button onClick={() => this.dijsktra(nodes, nodeS, nodeF)}>Dijkstra</button>
                   <button onClick={() => this.aStar(nodes, nodeS, nodeF)}>A*</button>
                   <button className="resetGrid" /*onClick={() => this.resetGrid()*} */>Clear path</button>
               </div>
           </div>
        )
    }
}

// This function generates the grid
function generateGrid(maxRow, maxCol, start, finish) {
    const nodes = [];
        for (let row = 0; row < maxRow; row++) {
            const currentRow = [];

            for (let col = 0; col < maxCol; col++) {
                // Defining the node object
                // Col, Row, isStart, isFinish 
                const currentNode = new NodeObj(
                    col,
                    row,
                    row === start[1] && col === start[0],
                    row === finish[1] && col === finish[0]
                )

                // Saving the column nodes in each row
                currentRow.push(currentNode)
            }

            // Saving the rows
            nodes.push(currentRow);
        }
    return nodes;
}

// This function animates each visited node
function animateAlgorithm(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
        let node = visitedNodes[i];
        if (i !== visitedNodes.length - 1) {
            // With setTimeout, we change the color of each visited node with 145ms  between them
            setTimeout(() => {
                document.getElementById(`${node["col"]},${node["row"]}`).style.background = "lightblue";
            } , SPEED * i);
        }
    }
}

// This function animates the path from the starting node to the finishing node 
// The animated path will be the one which as the minimum previous nodes
function animatePath(nodes) {

    let lastTime = nodes.length

    // Get the last node a.k.a last visited node
    let dest = nodes[nodes.length - 1]
    console.log({dest});
    const finalPath = [];

    // While we dont reach the start node, backtracks
     while(dest !== null) {
        finalPath.push(dest);
        dest = dest.previous;    
    }
        
    console.log({finalPath});
        
    // The last node is the nodeS, so we wont count it
    for (let i = finalPath.length - 2; i >= 0; i--) {
        setTimeout(() => {
            const node = finalPath[i]
            if (i === 0) {
                document.getElementById(`${node["col"]},${node["row"]}`).style.background = "yellow";
            } else {
                document.getElementById(`${node["col"]},${node["row"]}`).style.background = "purple";
            }
           // time of the last animation + time for the next animations
        } , (lastTime * SPEED + 50) + ( SPEED * (finalPath.length - i) ));
    }
}
