import React from 'react';
import './PathFinderVisualizer.css';
import Node from './Node/Node';
import { bfsAlgo } from '../algorithms/bfs';
import { dfsAlgo } from '../algorithms/dfs';
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
        let nodes = generateGrid(20, 30, [5, 5],[16, 18]);
        this.setState({nodes});
    }

    resetGrid() {
        // Reset any stylization
        let nodes = document.querySelectorAll('.node');
        nodes.forEach((node) => {
            if (node.style.background !== '') node.style.background = '';
        })
        this.componentDidMount();
    }

    bfs(dimension, nodeS, nodeF) {
        bfsAlgo(dimension, nodeS, nodeF);
    }
    
    dfs(dimension, nodeS, nodeF) {
        // dfsAlgo(dimension, nodeS, nodeF)
    }
    
    dijsktra(dimension, nodeS, nodeF) {
        dijkstraAlgo(dimension, nodeS, nodeF);
    }

    render() {
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
                const currentNode = {
                    col, 
                    row,
                    isStart: row === start[1] && col === start[0],
                    isFinish: row === finish[1] && col === finish[0]
                }
                currentRow.push(currentNode)
            }
            nodes.push(currentRow);
        }
    return nodes;
}