import React from 'react';
import './PathFinderVisualizer.css';
import Node from './Node/Node';

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

    render() {
        const {nodes} = this.state;
        console.log({nodes})
        return (
           <div className="grid">
               {
                  nodes.map((row, rIndex) => {
                      return <div key={rIndex} className="grid-row">
                        {
                          row.map((node, nodeIndex) => {
                              const {isStart, isFinish} = node;
                            return <Node 
                            id={nodeIndex} key={nodeIndex}
                            isStart = {isStart} isFinish = {isFinish}
                            ></Node>
                          })
                        }
                        </div>
                    })
               }
           </div>
        )
    }
}
