import Node from '../Node/NodeObj';

// Priority Queue
    /* UNSHIFT: ADD AT BEGINNING | SHIFT: REMOVE AT BEGINNING */

export const dijkstraAlgo = (dimension, nodeS, nodeF) => {

    // Check if nodes are in the same position | Disable this when given use option
    if (nodeS["col"] === nodeF["col"] && 
            nodeS["row"] === nodeF["row"]) {
                return [[nodeS], false];
    }

    nodeS.cost = 0;
    // This variable holds the open nodes
    const paths = [nodeS];
    let visited = []
    
    //let i = 0;
    while (paths.length > 0) {
        //console.log(`%c Loop ${i}`, 'color: red');

        let node = paths.shift();
        
        if (findNodeF(node, nodeF)) {

            let indexF = visited.forEach((node, index) => {
                if (node.isFinish) return index
            })
            visited = visited.slice(0, indexF + 1);
    
            return [visited, true];
        }
        
        // Mark as visited
        document.getElementById(`${node["col"]},${node["row"]}`).classList.add('visited');
        visited.push(node);

        validNeighbours(paths, visited, node, dimension, nodeF);

        // Order neighbours by the cost to travel to
        paths.sort((a, b) => a.cost - b.cost); 
        //console.log({paths});
        //console.log({paths});
        //i++;
    }

    return [visited, false];
}

// This function checks if a given node is the finish node
function findNodeF(node, nodeF) {
    return node["row"] === nodeF["row"] && node["col"] === nodeF["col"];
}

// This functions checks the neighbours and returns a list of the visited (valid) ones 
function validNeighbours(paths, visited, node, dimension, nodeF) {

    /* GRID DIMENSION: 0 = ROW | 1 = COLUMN */
    const maxRows = dimension[0]; 
    const maxColums = dimension[1]; 

    // Getting the coordinate of the given node
    const x = node["col"];
    const y = node["row"];

    // Checks UP
    if (y - 1 >= 0) {
        // Check if it was visited already
        if (!wasVisited([x, y - 1])) {
            addVisitedNode(paths, visited, node, [x, y - 1], nodeF);
        }
    }
    
    // Checks RIGHT
    if (x + 1 <= maxColums - 1) {
        if (!wasVisited([x + 1, y])) {
            addVisitedNode(paths, visited, node, [x + 1, y], nodeF);
        }
    }
    
    // Checks DOWN
    if (y + 1 <= maxRows - 1) {
        if (!wasVisited([x, y + 1])) {
            addVisitedNode(paths, visited, node, [x, y + 1], nodeF);
        }
    }
    
    // Checks LEFT
    if (x - 1 >= 0) {
        if (!wasVisited([x - 1, y])) {
            addVisitedNode(paths, visited, node, [x - 1, y], nodeF);
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
function addVisitedNode(paths, visited, previousNode, coordinate, nodeF) {

    const prevX = previousNode["col"];
    const prevY = previousNode["row"];
    
    const x = coordinate[0];
    const y = coordinate[1];

    // Because the direction is horizontal OR vertical
    // Is safe to do diff(x) + diff(y) because one of them will be 0
    // This is equivallent to EDGE + ACCUMULATED COST 
    const cost = Math.abs(x - prevX) + Math.abs(y - prevY) + previousNode.cost;

    // Getting the cost of the node (the neighbour node)
    const visitedCost = getVisitedCost(paths, x, y);

    // Update the cost if cost is smaller than the node's atual cost
    const realCost = Math.min(cost, visitedCost);

    let node = new Node(x, y, false, false);
    node.cost = realCost;
    node.previous = previousNode;

    
    if (findNodeF(node, nodeF)) {
        node.isFinish = true
    }

    paths.push(node);
    visited.push(node);
}

// This function returs the current cost of the node of coordinate (x, y)
function getVisitedCost(paths, x, y) {
    for (let node in paths) {
        if (node["col"] === x && node["row"] === y) return node.cost;
    }
    return Infinity;
}