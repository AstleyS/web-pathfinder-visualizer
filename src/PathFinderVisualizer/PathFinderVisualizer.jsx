import React, { useState } from 'react';
import './PathFinderVisualizer.css';

import Node from '../Node/Node';

// Import the algorithm functions
import { bfsOrDfs as bfsOrDfsAlgo } from '../algorithms/bfsOrDfs';
import { dijkstraOrAS as dijkstraOrASAlgo } from '../algorithms/dijkstraOrAS';

const ROW = 20;
const COLUMN = 30;
const SPEED = 140; // The less the more speed

export default function PathFinderVisualizer({algo, walls, playAlgo, resetW, resetP}) {

    // Decostructing the objects passed by arguments 
    const { play, setPlay } = playAlgo;
    const { resetWalls, setResetWalls } = resetW;
    const { resetPath, setResetPath } = resetP;

    const [validNodes, setValidNodes] = useState(false);

    const [nodeS, setNodeS] = useState(new Node(-1, -1, false, false));
    const [nodeF, setNodeF] = useState(new Node(-1, -1, false, false));
    
    const nodes = generateGrid(ROW, COLUMN); 
    console.log({nodes});

    console.log({algo});
    console.log({walls});
    console.log({play});
    console.log({validNodes});
    console.log({resetWalls});
    console.log({resetPath});

    // Check if the play button was clicked and start the chosen algorithm
    if (play) {
        if (validNodes) {

            changeOnPlay();

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
        } else {
            document.getElementById('play-btn').innerText = 'Place Nodes in the Grid';
            console.log('Invalid');
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
        <div id = 'main'>
            <div className = "glass">
                <div className = "guide text-dark">
                    <span className = "nodeS"></span> Start 
                    <span className = "nodeF"></span>  
                    <span className = "nodeFound"></span> Finish | Found Node  
                    <span className = "nodeWall"></span> Wall  
                    <span className = "algo"></span> Algorithm 
                    <span className = "path"></span> Path 
                </div>
                <div className="grid">
                    {
                        nodes.map((row, rIndex) => {
                            return <div key = { rIndex } className = "grid-row" >
                                {
                                row.map((node, cIndex) => {
                                    // const isStart = (cIndex === START_X && rIndex === START_Y);
                                    // const isFinish = (cIndex === FINISH_X && rIndex === FINISH_Y);
                                    //const extraClassName = isStart ? ' node-start visited': isFinish ? ' node-finish' : '';
                                    return ( 
                                        <div onClick = {() => addNode([cIndex, rIndex], [nodeS, setNodeS], [nodeF, setNodeF], walls, setValidNodes) } 
                                            id = {`${cIndex},${rIndex}`} 
                                            className = {`node`} key = {cIndex}>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function addNode(coordinate, placedNodeS, placedNodeF, walls, setValidNodes) {

    const x = coordinate[0];
    const y = coordinate[1];

    const nodeS = placedNodeS[0];
    const nodeF = placedNodeF[0];

    const setNodeS = placedNodeS[1];
    const setNodeF = placedNodeF[1];

    const element = document.getElementById(`${x},${y}`);

    // The user must first clean the path and only then remove/add nodes 
    if (document.getElementById('clearPath-btn').disabled) {
        // TOGGLE nodeS
        if (element.classList.contains('node-start')) {
            
            element.classList.remove('node-start', 'visited');
            setNodeS(new Node(-1, -1, false, false));
            return ;
        } 
    
        // TOGGLE nodeF
        if (element.classList.contains('node-finish')) {
        
            element.classList.remove('node-finish');
            setNodeF(new Node(-1, -1, false, false));
            setValidNodes(false);
            return ;
        } 
    
        //Check if we have nodeS and nodeF placed. If yes, then we add walls
        if (!nodeS.isStart) {
    
            element.classList.add('node-start', 'visited');
            setNodeS(new Node(x, y, true, false));
            return ;
        }
        
        if (!nodeF.isFinish) {
            
            element.classList.add('node-finish');
            setNodeF(new Node(x, y, false, true));
            setValidNodes(true);
            return ;
         }
        
        if (walls) {
    
            const walls = document.querySelectorAll('.wall');
            if (walls.length >= 0 ) {
                document.getElementById('clearWalls-btn').disabled = false; // =0 because of cycle
            } else {
                document.getElementById('clearWalls-btn').disabled = true;
            }
            // Toggle wall
            if (element.classList.contains('wall')) {
                element.classList.remove('wall');
                return ;
            } 
            element.classList.add('wall');
        }
        
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
        
    // With slice(0) we are including nodeS
    animateAlgorithm(visited);
    
    if (nodes[1]) {
        
        // The first args refers to the time that the animateAlgorithm finished + 50ms
        // The second args referes to the last node a.k.a nodeF
        // The third args referes to the setter of the play useState
        animatePath(SPEED * visited.length + 75, visited[visited.length - 1], setPlay); 
   } else {
       changeAfterPlay(setPlay);
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

    const incrementOpacity = (0.7 / visitedNodes.length);  
    let opacity = 0.3

    for (let i = 0; i < visitedNodes.length; i++) {
        let node = visitedNodes[i];

        // With setTimeout, we change the color of each visited node with SPEED time between them
        setTimeout(() => {
            if (!node.isFinish) {
                document.getElementById(`${node.col},${node.row}`).style.background = `rgba(109, 93, 254, ${opacity})`;
                opacity += incrementOpacity
            
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
        
    const incrementR = Math.floor(228 / finalPath.length); 
    const incrementG = Math.floor((255 - 128) / finalPath.length); 
    let r = 0;
    let g = 128;
    // The last node is the nodeS, so we wont count it
    for (let i = 1; i <= finalPath.length; i++) {

        setTimeout(() => {
            const node = finalPath[i];

            if (i === finalPath.length) {
                changeAfterPlay(setPlay);
            } else if (i === finalPath.length - 1) {
                document.getElementById(`${node.col},${node.row}`).style.background = "yellow";
            } else {
                r += incrementR;
                g += incrementG;
                document.getElementById(`${node.col},${node.row}`).style.background = `rgb(${r}, ${g}, 0)`;
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

function changeOnPlay() {
    
    const playBtn = document.getElementById('play-btn'); 

    // Change choose algo dropdown state
    document.getElementById('collasible-nav-dropdown').classList.add('disabled');
    
    // Change add walls button state
    document.getElementById('addWalls-btn').disabled = true;
    
    // Change play button state
    playBtn.classList.replace('btn-success', 'btn-danger');
    playBtn.innerText = 'Searching for path...';
    playBtn.disabled = true;
    
    // Change clear walls button state
    document.getElementById('clearWalls-btn').disabled = true;
    // Change clear path button state
    document.getElementById('clearPath-btn').disabled = true;
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