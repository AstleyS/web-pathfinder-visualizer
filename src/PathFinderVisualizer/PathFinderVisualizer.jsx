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
        const nodes = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 30; col++) {
                const currentNode = {
                    col, row,
                    isStart: row === 5 && col === 5,
                    isFinish: row === 10 && col === 20
                }
                currentRow.push(currentNode)
            }
            nodes.push(currentRow);
        }
        this.setState({nodes})
    }

    bfs(grid, nodeS, nodeF) {
        bfsAlgo(grid, nodeS, nodeF);
    }
    
    dfs(grid, nodeS, nodeF) {
        console.log(dfsAlgo(grid, nodeS, nodeF));
    }
    
    dijsktra(grid, nodeS, nodeF) {
        console.log(dijkstraAlgo(grid, nodeS, nodeF));
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
                   <button onClick={() => this.bfs(nodes, nodeS, nodeF)}>BFS</button>
                   <button onClick={() => this.dfs(nodes, nodeS, nodeF)}>DFS</button>
                   <button onClick={() => this.dijsktra(nodes, nodeS, nodeF)}>Dijkstra</button>
               </div>
           </div>
        )
    }
}
