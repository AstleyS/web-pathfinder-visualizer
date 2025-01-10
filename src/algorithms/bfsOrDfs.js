// This function implements the BFS algorithm and returns the visited nodes
import Node from '../components/Node/NodeComponent';

// If BFS = QUEUE (FIFO)
    // BFS find the shortest path by repeatedly visiting the adjacent node
    // My analogy: The parent node likes all his children 
    // and once the children becomes a parent, the pattern repeats
    
    /* SHIFT: REMOVE AT BEGINNING | PUSH: ADD AT LAST */
    
// If DFS = STACK (LIFO)
    // DFS find the shortest path by repeatedly visiting the open/atual node till not possible
    // My analogy: The parent node just likes one of his children
    // and once the child becomes a parent, the pattern repeats
    
    /* POP: REMOVE AT LAST | PUSH: ADD AT LAST*/

export const bfsOrDfs = (algo, dimension, nodeS, nodeF) => {

    if (nodeS.col === nodeF.col && 
            nodeS.row === nodeF.row) {
                return [[nodeS], false];
    }

    // This variable holds the open nodes
    const paths = [nodeS];
    // This variable holds the visited nodes
    const visited = []

    let i = 0;
    // While the are nodes to visit
    console.log({nodeS, nodeF, paths});
    while (paths.length > 0 && i <= dimension[0] * dimension[1]) {
        console.log(`%c Loop ${i}`, 'color: red');

        // If BFS, removes node from the start of the queue || start of the array
        // If DFS, removes node from the top of the stack || end of the array
        const node = algo === 'BFS' ? paths.shift(): paths.pop();

        console.log({node});

        // Check the valid neighbours
        const foundNodeF = validNeighbours(paths, visited, node, dimension, nodeF);

        // If node equal to undefined means that we found nodeF
        if (foundNodeF) {
            return [visited, true];
        }
        
        i++;
    }
    return [visited, false];

}

// This functions checks the neighbours and returns a list of the visited (valid) ones 
function validNeighbours(paths, visited, node, dimension, nodeF) {

    /* GRID DIMENSION: 0 = ROW | 1 = COLUMN */
    const maxRows = dimension[0]; 
    const maxColums = dimension[1]; 

    // Getting the coordinate of the given node
    const x = node.col;
    const y = node.row;

    let isNodeF = false;

    // Checks UP
    if (y - 1 >= 0) {
        // Check if it was visited already
        // if DFS, break
        if (!wasVisited([x, y - 1])) {
            isNodeF = addVisitedNode(paths, visited, node, [x, y - 1], nodeF);
            if (isNodeF) return true;
        }
    }
    
    // Checks RIGHT
    if (x + 1 <= maxColums - 1) {
        if (!wasVisited([x + 1, y])) {
            isNodeF = addVisitedNode(paths, visited, node, [x + 1, y], nodeF);
            if (isNodeF) return true;
        }
    }
    
    // Checks DOWN
    if (y + 1 <= maxRows - 1) {
        if (!wasVisited([x, y + 1])) {
            isNodeF = addVisitedNode(paths, visited, node, [x, y + 1], nodeF);
            if (isNodeF) return true;
        }
    }
    
    // Checks LEFT
    if (x - 1 >= 0) {
        if (!wasVisited([x - 1, y])) {
            isNodeF = addVisitedNode(paths, visited, node, [x - 1, y], nodeF);
            if (isNodeF) return true;
        }
    }

    return ;
}

// This function checks if the node was already visited or if it's a wall
function wasVisited(coordinate) {
    const node = document.getElementById(`${coordinate[0]},${coordinate[1]}`);
    
    // Check if the node as a visited "flag"
    if (node.classList.contains("visited") || node.classList.contains("wall")) return true;

    return false;
}

// This function adds the visited node accordingly to the algorithm
// Return true or false whether the nodeF was found
function addVisitedNode(paths, visited, previousNode, coordinate, nodeF) {

    const x = coordinate[0];
    const y = coordinate[1];

    let node = new Node(x, y, false, false);
    node.previous = previousNode;

  
    // Check if its end node
    if (nodeF.row === y && nodeF.col === x) {
        node.isFinish = true;
        console.log(`%c Found`, 'color: brown');
        
        document.getElementById(`${x},${y}`).classList.add("visited");
        visited.push(node);
        return true;
    }

    paths.push(node);

    // Tag visited
    document.getElementById(`${x},${y}`).classList.add("visited");
    visited.push(node);
    return false;
}