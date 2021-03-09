// This function implements the BFS algorithm and returns the visited nodes
import Node from '../PathFinderVisualizer/Node/NodeObj'

export const bfsOrDfs = (algo, dimension, nodeS, nodeF) => {
    // If BFS = QUEUE (FIFO)
    /* PUSH: ADD AT LAST | POP: REMOVE AT LAST*/
    
    // If DFS = STACK (LIFO)
    /* UNSHIFT: ADD AT BEGINNING | SHIFT: REMOVE AT BEGINNING */

    // This variable holds the open nodes (coordinate) [x, y]
    const paths = [nodeS];
    let visited = []

    let i = 0;
    // While the are nodes to visit
    while (paths.length > 0) {
        console.log(`%c Loop ${i}`, 'color: red');

        // If BFS, removes node from the start of the queue || start of the array
        // If DFS, removes node from the top of the stack || end of the array
        let node = algo === 'BFS' ? paths.shift(): paths.pop();
        console.log({node})
        
        // Check the valid neighbours
        validNeighbours(algo, paths, visited, node, dimension);

        // Check if we found the node
        // 0: true or false
        if (findNodeF(paths, nodeF)) {
            break;
        }
        
        i++;
    }

    console.log({visited})
    console.log({paths})
    return visited;

}

// This functions checks the neighbours and returns a list of the visited (valid) ones 
function validNeighbours(algo, paths, visited, node, dimension) {

    /* GRID DIMENSION: 0 = ROW | 1 = COLUMN */
    const maxRows = dimension[0]; 
    const maxColums = dimension[1]; 

    // Getting the coordinate of the given node
    const x = node["col"];
    const y = node["row"];

    // Checks UP
    if (y - 1 >= 0) {
        // Check if it was visited already
        // if DFS, break
        if (!wasVisited([x, y - 1])) {
            addVisitedNode(algo, paths, visited, node, [x, y - 1]);
            if (algo === 'DFS') return ;
        }
    }
    
    // Checks RIGHT
    if (x + 1 <= maxColums - 1) {
        if (!wasVisited([x + 1, y])) {
            addVisitedNode(algo, paths, visited, node, [x + 1, y]);
            if (algo === 'DFS') return ;
        }
    }
    
    // Checks DOWN
    if (y + 1 <= maxRows - 1) {
        if (!wasVisited([x, y + 1])) {
            addVisitedNode(algo, paths, visited, node, [x, y + 1]);
            if (algo === 'DFS') return ;
        }
    }
    
    // Checks LEFT
    if (x - 1 >= 0) {
        if (!wasVisited([x - 1, y])) {
            addVisitedNode(algo, paths, visited, node, [x - 1, y]);
            if (algo === 'DFS') return ;
        }
    }
}

// This function checks if the node was already visited
function wasVisited(coordinate) {
    const node = document.getElementById(`${coordinate[0]},${coordinate[1]}`);
    
    // Check if the node as a visited "flag"
    if (node.classList.contains("visited")) return true;

    // If not, adds it
    node.classList.add("visited");
    return false;
}

// This function adds the visited node accordingly to the algorithm
function addVisitedNode(algo, paths, visited, previousNode, coordinate) {

    const x = coordinate[0];
    const y = coordinate[1];

    let node = new Node(x, y, false, false);
    node.previous = previousNode;

    // If BFS, adds the node to the end of the queue || end of the array
    if (algo === 'BFS') {
        paths.push(node);
        visited.push(node);

    // If DFS, adds the node to the top of the stack || start of the array
    } else {
        paths.unshift(node);
        visited.push(node);
    }
}

// This function checks if we reached the finish node
function findNodeF(paths, nodeF) {
    // Traversing throught the nodes
    for (let i = 0; i < paths.length; i++) {
        // console.log(`%c Current Node[${i}] x:${node[0]} y:${node[1]}`, 'color: blue');
        // Check if the node is the same as the one passed by args (the destination)
        // Row  is the y axis and column is the x axis
        let node = paths[i];
        if (node["row"] === nodeF["row"] && node["col"] === nodeF["col"]) {
            console.log(`%c Found`, 'color: brown');
            
            return true;
        }
    }
    return false;
}