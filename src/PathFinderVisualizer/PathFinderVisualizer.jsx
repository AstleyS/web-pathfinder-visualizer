import React from 'react';
import './PathFinderVisualizer.css';

import Node from '../Node/Node';
import NodeObj from '../Node/NodeObj';

// Import the algorithm functions
import { bfsOrDfs as bfsOrDfsAlgo } from '../algorithms/bfsOrDfs';
import { dijkstraOrAS as dijkstraOrASAlgo } from '../algorithms/dijkstraOrAS';

const ROW = 20;
const COLUMN = 30;

// Has to be less than columns
const START_X = 8;
// Has to be less than row
const START_Y = 7;

// Has to be less than columns
const FINISH_X = 18;
// Has to be less than row
const FINISH_Y = 10;

const SPEED = 110; // The less the more speed

export default function PathFinderVisualizer({algo, playAlgo, reset}) {

    // Decostructing the objects passed by arguments 
    const { play, setPlay } = playAlgo;
    const { resetPath, setResetPath } = reset;

    const nodeS = new NodeObj(START_X, START_Y, true, false);
    const nodeF = new NodeObj(FINISH_X, FINISH_Y, false, true);
    
    const nodes = generateGrid(ROW, COLUMN, [START_X, START_Y], [FINISH_X, FINISH_Y]); 
    console.log({nodes});

    console.log({algo});
    console.log({play});
    console.log({resetPath});

    // Check if the play button was clicked and start the chosen algorithm
    if (play) {
        switch(algo) {
            case 'BFS': 
                bfsOrDFS('BFS', nodes, nodeS, nodeF, setPlay);
                break;
            case 'DFS': 
                bfsOrDFS('DFS', nodes, nodeS, nodeF, setPlay);
                break;
            case 'Dijkstra': 
                dijkstraOrAS('Dijkstra', nodes, nodeS, nodeF, setPlay);
                break;
            case 'AStar': 
                dijkstraOrAS('AStar', nodes, nodeS, nodeF, setPlay);
                break;
            default:
                console.log('Algo not found');
        }
    }

    // Check if the clear path button was clicked
    if (resetPath) {
        clearPath(setResetPath);
    } 

    return (
        <div className = "container-fluid">
            <div className="grid">
                {
                    nodes.map((row, rIndex) => {
                        return <div key={ rIndex } className="grid-row" >
                            {
                            row.map((node, nodeIndex) => {
                                const { isStart, isFinish, col, row } = node;
                                return <Node
                                    coordinates={`${col},${row}`} key={ nodeIndex }
                                    isStart = { isStart } isFinish = { isFinish }
                                ></Node>
                            })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
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
                );

                // Saving the column nodes in each row
                currentRow.push(currentNode);
            }

            // Saving the rows
            nodes.push(currentRow);
        }
    return nodes;
}

// This function handles the user click when choosing BFS or DFS
function bfsOrDFS(algo, grid, nodeS, nodeF, setPlay) {
    // DIMENSION: 0 = ROW | 1 = COLUMN
    const dimension = [grid.length, grid[0].length];

    console.time("runtime");

    // This variable holds the result of the BFS algorithm visisted nodes
    // [0] = visited nodes [1] = found node
    
    console.log({nodeS, nodeF});
    const nodes = bfsOrDfsAlgo(algo, dimension, nodeS, nodeF);
    const visited = nodes[0];
    console.log({visited});
        
    console.timeEnd("runtime");
        
   animateAlgorithm(visited);
   
   // The first args refers to the time that the animateAlgorithm finished + 50ms
   // The seconde args return the last node a.k.a nodeF
   if (nodes[1]) animatePath(SPEED * visited.length + 75, visited[visited.length - 1], setPlay); 
}

// This function handles the user click when choosing Dijsktra
function dijkstraOrAS(algo, grid, nodeS, nodeF, setPlay) {
    const dimension = [grid.length, grid[0].length];

    console.time('runtime');
    
    const nodes = dijkstraOrASAlgo(algo, dimension, nodeS, nodeF);
    const visited = nodes[0];
    console.log({visited});

    console.timeEnd('runtime');

    // With slice(0) we are including nodeS
    animateAlgorithm(visited.slice(1));

    // The first args refers to the time that the animateAlgorithm finished + 50ms
    // The seconde args return the last node a.k.a nodeF
    if (nodes[1]) animatePath(SPEED * visited.length + 75, visited[visited.length - 1], setPlay);
}

// This function animates each visited node
function animateAlgorithm(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
        let node = visitedNodes[i];
        if (i !== visitedNodes.length - 1) {
            // With setTimeout, we change the color of each visited node with SPEED time between them
            setTimeout(() => {
                if (!node.isFinish) {
                    document.getElementById(`${node.col},${node.row}`).style.background = "lightblue";
                } else {
                    document.getElementById(`${node.col},${node.row}`).style.background = "red";
                }
            } , SPEED * i);
        }
    }
}

// This function animates the path from the starting node to the finishing node 
// The animated path will be the one which as the minimum previous nodes
function animatePath(lastTime, nodeF, setPlay) {

    // Get the last node a.k.a last visited node
    let dest = nodeF
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
            if (node.isFinish) {
                document.getElementById(`${node.col},${node.row}`).style.background = "yellow";
                changeAfterPlay(setPlay);

            } else {
                document.getElementById(`${node.col},${node.row}`).style.background = "purple";
            }
           // time of the last animation + time for the next animations
        } , lastTime + ( SPEED * (finalPath.length - i) ));
    }
}

// This function clears the path
function clearPath(setResetPath) {

    // Reset any stylization
    let nodes = document.querySelectorAll('.node');
    nodes.forEach((node) => {
        if (node.style.background !== '') node.style.background = '';
        if (node.classList.contains('visited') && !node.classList.contains('node-start')) node.classList.remove('visited');
    });

    // Set the clear path button
    setResetPath(false);
    document.getElementById('clearPath-btn').disabled = true;
    document.getElementById('play-btn').disabled = false;
}

// This functions change some elements state
function changeAfterPlay(setPlay) {

    // Change choose algo dropdown state
    document.getElementById('collasible-nav-dropdown').classList.remove('disabled');;

    // Change play button state
    document.getElementById('play-btn').classList.replace('btn-danger', 'btn-success');
    document.getElementById('play-btn').innerText = 'Play';

    setPlay(false);

    // Change clear path state
    document.getElementById('clearPath-btn').disabled = false;
} 