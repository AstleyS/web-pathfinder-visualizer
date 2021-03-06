import React from 'react';
import './PathFinderVisualizer.css';
import Node from './Node/Node';
// Import the algorithm functions
import { bfsOrDfs } from '../algorithms/bfsOrDfs';
import { dijkstraAlgo } from '../algorithms/dijkstra';

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
        let nodes = generateGrid(20, 30, [5, 5],[10, 8]);
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
    bfs(dimension, nodeS, nodeF) {
        // This variable holds the result of the BFS algorithm visisted nodes
        const nodes = bfsOrDfs('BFS', dimension, nodeS, nodeF);
        animateAlgorithm(nodes);
        //console.log({nodes});
    }


    // This function handles the user click when choosing DFS
    dfs(dimension, nodeS, nodeF) {
        const nodes = bfsOrDfs('DFS', dimension, nodeS, nodeF);
        animateAlgorithm(nodes);
        //console.log({nodes});
    }
    
    // This function handles the user click when choosing Dijsktra
    dijsktra(dimension, nodeS, nodeF) {
        dijkstraAlgo(dimension, nodeS, nodeF);
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
                   <button onClick={() => this.bfs(nodes.length, nodeS, nodeF)}>BFS</button>
                   <button onClick={() => this.dfs(nodes.length, nodeS, nodeF)}>DFS</button>
                   <button onClick={() => this.dijsktra(nodes.length, nodeS, nodeF)}>Dijkstra</button>
                   <button className="resetGrid" onClick={() => this.resetGrid()}>Clear path</button>
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
                const currentNode = {
                    col, 
                    row,
                    isStart: row === start[1] && col === start[0],
                    isFinish: row === finish[1] && col === finish[0]
                }
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
        // With setTimeout, we change the color of each visited node with 145ms  between them
        setTimeout(() => {
            document.getElementById(`${node[0]},${node[1]}`).style.background = "lightblue";
        } , 145 * i);
    }
}
