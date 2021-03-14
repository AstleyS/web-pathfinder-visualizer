import Node from '../Node/NodeObj';

// Priority Queue
    /* UNSHIFT: ADD AT BEGINNING | SHIFT: REMOVE AT BEGINNING */

export const dijkstraOrAS = (algo, dimension, nodeS, nodeF) => {

    // Check if nodes are in the same position | Disable this when given use option
    if (nodeS["col"] === nodeF["col"] && 
            nodeS["row"] === nodeF["row"]) {
                return [[nodeS], false];
    }

    nodeS.cost = 0;
    
    // Check if AStar to add heuristic
    if (algo === 'AStar') {
        nodeS.heuristic = heuristic(nodeS, nodeF);
        nodeS.totalCost = nodeS.heuristic + nodeS.cost;
    }
    
    // This variable holds the open nodes
    const paths = [nodeS];
    let visited = []
    
    let i = 0;
    // While there are unvisited nodes and node not found
    // We need also to check if loop didn't reach the maximum iteration possible to prevent browser to crash
    while (paths.length > 0 || i <= dimension[0] * dimension[1]) {
        console.log(`%c Loop ${i}`, 'color: red');

        let node = paths.shift();  
        console.log('Shit');
        console.log({node});
        
        // If we found the node then we should get rid of the other nodes 
        if (findNodeF(node, nodeF)) {
            console.log(`%c Found`, 'color: brown');

            let indexF = 0;
            for (let i = 0; i < visited.length; i++) {
                if (visited[i].isFinish) {
                    indexF = visited.indexOf(visited[i]);
                    break;
                }
            }

            visited = visited.slice(0, indexF + 1);
            return [visited, true];
        }
    
        // Mark as visited
        document.getElementById(`${node["col"]},${node["row"]}`).classList.add('visited');
        visited.push(node);

        validNeighbours(algo, paths, visited, node, dimension, nodeF);

        // Order neighbours by the cost to travel to
        if (algo === 'AStar') {
            paths.sort((a, b) => a.totalCost - b.totalCost);
        } else {
            paths.sort((a, b) => a.cost - b.cost);
        } 
        //console.log({paths});
        i++;
    }

    return [visited, false];
}

// This function calculates the heuristic
function heuristic(node, nodeF) {

    // Node coordinate
    const x1 = node.col;
    const y1 = node.row;
    
    // Node Finish coordinate
    const x2 = nodeF.col;
    const y2 = nodeF.row;

    // The heuristic is the distance between the sqrt((x2-x1)² + (y2-y1)²) 
    const heuristic = Math.floor(Math.sqrt(((x2-x1) ** 2) + ((y2-y1) ** 2)));
    //console.log(`Heuristic ${heuristic}`);
    node.heuristic = heuristic;
    
    return heuristic;
}

// This function checks if a given node is the finish node
function findNodeF(node, nodeF) {
    return node.row === nodeF.row && node.col === nodeF.col;
}

// This functions checks the neighbours and returns a list of the visited (valid) ones 
function validNeighbours(algo, paths, visited, node, dimension, nodeF) {

    /* GRID DIMENSION: 0 = ROW | 1 = COLUMN */
    const maxRows = dimension[0]; 
    const maxColums = dimension[1]; 

    // Getting the coordinate of the given node
    const x = node.col;
    const y = node.row;

    // Checks UP
    if (y - 1 >= 0) {
        // Check if it was visited already
        if (!wasVisited([x, y - 1])) {
            addVisitedNode(algo, paths, visited, node, [x, y - 1], nodeF);
        }
    }
    
    // Checks RIGHT
    if (x + 1 <= maxColums - 1) {
        if (!wasVisited([x + 1, y])) {
            addVisitedNode(algo, paths, visited, node, [x + 1, y], nodeF);
        }
    }
    
    // Checks DOWN
    if (y + 1 <= maxRows - 1) {
        if (!wasVisited([x, y + 1])) {
            addVisitedNode(algo, paths, visited, node, [x, y + 1], nodeF);
        }
    }
    
    // Checks LEFT
    if (x - 1 >= 0) {
        if (!wasVisited([x - 1, y])) {
            addVisitedNode(algo, paths, visited, node, [x - 1, y], nodeF);
        }
    }
}

// This function checks if the node was already visited
// The reason why I am not checking the visited list
// is due to the runtime performance
function wasVisited(coordinate) {
    const node = document.getElementById(`${coordinate[0]},${coordinate[1]}`);
    
    // Check if the node as a visited "flag"
    if (node.classList.contains("visited")) return true;

    return false;
}

// This function adds the adjacent nodes
function addVisitedNode(algo, paths, visited, previousNode, coordinate, nodeF) {

    
    // Previous node coordinate
    const prevX = previousNode.col;
    const prevY = previousNode.row;
    
    // Node (neighbour) coordinate
    const x = coordinate[0];
    const y = coordinate[1];
    
    let node = new Node(x, y, false, false);
    console.log('Neighbour');
    
    // Because the direction is horizontal OR vertical
    // Is safe to do diff(x) + diff(y) because one of them will be 0
    // This is equivallent to EDGE + ACCUMULATED COST 
    const newCost = Math.abs(x - prevX) + Math.abs(y - prevY) + previousNode.cost;
    
    // Getting the cost of the node (the neighbour node) if exists
    const currentCost = getCurrentCost(paths, x, y);
    
    // Update the cost if cost is smaller than the node's atual cost
    const updatedCost = Math.min(newCost, currentCost);
    
    node.cost = updatedCost;
    node.previous = previousNode;

    if (algo === 'AStar') {
        const h = heuristic(node, nodeF);
        node.totalCost = newCost + h;
    }
    
    
    if (findNodeF(node, nodeF)) {
        node.isFinish = true;
    }

    console.log({node});
    
    paths.push(node);
    visited.push(node);
}

// This function returs the current cost of the node of coordinate (x, y)
function getCurrentCost(paths, x, y) {
    // If it exists the returns the cost
    for (let node in paths) {
        if (node.col === x && node.row === y) return node.cost;
    }

    // If not, return infinity
    return Infinity;
}
