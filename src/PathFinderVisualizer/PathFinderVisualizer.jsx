import React from 'react';
import './PathFinderVisualizer.css';

import Node from '../Node/Node';

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
const FINISH_X = 12;
// Has to be less than row
const FINISH_Y = 10;

const SPEED = 110; // The less the more speed

export default function PathFinderVisualizer({algo, walls, playAlgo, resetW, resetP}) {

    // Decostructing the objects passed by arguments 
    const { play, setPlay } = playAlgo;
    const { resetWalls, setResetWalls } = resetW;
    const { resetPath, setResetPath } = resetP;

    const nodeS = new Node(START_X, START_Y, true, false);
    const nodeF = new Node(FINISH_X, FINISH_Y, false, true);
    
    const nodes = generateGrid(ROW, COLUMN); 
    console.log({nodes});

    console.log({algo});
    console.log({walls});
    console.log({play});
    console.log({resetWalls});
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

    // Check if the clear walls button was clicked
    if (resetWalls) {
        clearWalls(setResetWalls);
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
                        return <div key = { rIndex } className = "grid-row" >
                            {
                            row.map((node, cIndex) => {
                                const isStart = (cIndex === START_X && rIndex === START_Y);
                                const isFinish = (cIndex === FINISH_X && rIndex === FINISH_Y);
                                const extraClassName = isStart ? ' node-start visited': isFinish ? ' node-finish' : '';
                                return ( 
                                    <div onClick = {() => addNode([cIndex, rIndex], walls) } 
                                        id = {`${cIndex},${rIndex}`} 
                                        className = {`node${extraClassName}`} key = {cIndex}>
                                    </div>
                                )
                            })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}

function addNode(coordinate, walls) {

    const x = coordinate[0];
    const y = coordinate[1];
    const element = document.getElementById(`${x},${y}`);

    // // TOGGLE nodeS
    // if (element.classList.contains('node-start')) {
        
    //     element.classList.remove('node-start', 'visited');
    //     //setNodeS(new Node(-1, -1, false, false));
    //     return ;

    // // TOGGLE nodeF
    // } else if (element.classList.contains('node-finish')) {
    
    //     element.classList.remove('node-finish');
    //     //setNodeF(new Node(-1, -1, false, false));
    //     return ;
    
    // } 

    // Check if we have nodeS and nodeF placed. If yes, then we add walls
    // if (!nodeS.isStart) {

    //     element.classList.add('node-start', 'visited');
    //     //setNodeS(new Node(x, y, true, false));
    //     return ;

    // } else if (!nodeF.isFinish) {
        
    //     element.classList.add('node-finish');
    //     //setNodeF(new Node(x, y, false, true));
    //     return ;

    // } else 
    
    if (walls) {

        const walls = document.querySelectorAll('.wall');
        if (walls.length >= 0 ) document.getElementById('clearWalls-btn').disabled = false; // =0 because of cycle

        // Toggle wall
        if (element.classList.contains('wall')) {

            element.style.background = '';
            element.classList.remove('wall');
            return ;
        } 
        
        element.style.background = 'black';
        element.classList.add('wall');
    }

    // document.getElementById('collasible-nav-dropdown').innerText = 'Choose Algorithm';
    // document.getElementById('collasible-nav-dropdown').classList.remove('disabled');
    
}

// This function generates the grid
function generateGrid(maxRow, maxCol) {
    const nodes = [];
        for (let row = 0; row < maxRow; row++) {
            const currentRow = [];

            for (let col = 0; col < maxCol; col++) {
                // Defining the node object
                // Col, Row, isStart, isFinish 
                const currentNode = `${col},${row}`;

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
    const nodes = bfsOrDfsAlgo(algo, dimension, nodeS, nodeF);
    const visited = nodes[0];
    
    console.timeEnd("runtime");
    console.log({visited});
        
    animateAlgorithm(visited);
    if (nodes[1]) {
        
        // The first args refers to the time that the animateAlgorithm finished + 50ms
        // The second args referes to the last node a.k.a nodeF
        // The third args referes to the setter of the play useState
        animatePath(SPEED * visited.length + 75, visited[visited.length - 1], setPlay); 
   }
}

// This function handles the user click when choosing Dijsktra
function dijkstraOrAS(algo, grid, nodeS, nodeF, setPlay) {
    const dimension = [grid.length, grid[0].length];

    console.time('runtime');
    
    const nodes = dijkstraOrASAlgo(algo, dimension, nodeS, nodeF);
    const visited = nodes[0];
    
    console.timeEnd('runtime');
    console.log({visited});

    // With slice(0) we are including nodeS
    animateAlgorithm(visited.slice(1));
    
    if (nodes[1]) {
        // The first args refers to the time that the animateAlgorithm finished + 50ms
        // The second args referes to the last node a.k.a nodeF
        // The third args referes to the setter of the play useState
        animatePath(SPEED * visited.length + 75, visited[visited.length - 1], setPlay);
    } else {
        changeAfterPlay(setPlay);
    }
}

// This function animates each visited node
function animateAlgorithm(visitedNodes) {

    for (let i = 0; i < visitedNodes.length; i++) {
        let node = visitedNodes[i];

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

// This function animates the path from the starting node to the finishing node 
// The animated path will be the one which as the minimum previous nodes
function animatePath(lastTime, nodeF, setPlay) {

    // Get the last node a.k.a last visited node
    let dest = nodeF
    console.log({dest});
    let finalPath = [];

    // While we dont reach the start node, backtracks
     while(dest !== null) {
        finalPath.push(dest);
        dest = dest.previous;    
    }
        
    finalPath.reverse();
    console.log({finalPath});
        
    // The last node is the nodeS, so we wont count it
    for (let i = 0; i <= finalPath.length; i++) {

        setTimeout(() => {
            const node = finalPath[i];
            if (i === finalPath.length) {
                changeAfterPlay(setPlay);
            } else if (i === finalPath.length - 1) {
                document.getElementById(`${node.col},${node.row}`).style.background = "yellow";
            } else {
                document.getElementById(`${node.col},${node.row}`).style.background = "purple";
            }

        // time of the last animation + time for the next animations
        } , lastTime + (SPEED * (i - 1)));
    }
}

// This function clears the walls
function clearWalls(setResetWalls) {
    
    setResetWalls(false);

    // Reset any stylization
    const walls = document.querySelectorAll('.wall');
    walls.forEach((wall) => {
        wall.classList.remove('wall');
        wall.style.background = '';
    });

    document.getElementById('clearWalls-btn').disabled = true;
}

// This function clears the path
function clearPath(setResetPath) {
    
    setResetPath(false);

    // Reset any stylization
    const nodes = document.querySelectorAll('.visited');
    nodes.forEach((node) => {
        if (!node.classList.contains('node-start')) node.classList.remove('visited');
        node.style.background = '';
    });

    // Set the clear path button
    document.getElementById('clearPath-btn').disabled = true;
    document.getElementById('play-btn').disabled = false;
    document.getElementById('addWalls-btn').disabled = false;
}

// This functions change some elements state
function changeAfterPlay(setPlay) {
    
    setPlay(false);

    // Change choose algo dropdown state
    document.getElementById('collasible-nav-dropdown').classList.remove('disabled');;

    // Change play button state
    document.getElementById('play-btn').classList.replace('btn-danger', 'btn-success');
    document.getElementById('play-btn').innerText = 'Play';

    // Change clear path state
    document.getElementById('clearPath-btn').disabled = false;

    const walls = document.querySelectorAll('.wall');
    if (walls.length > 0 ) document.getElementById('clearWalls-btn').disabled = false;
    
} 