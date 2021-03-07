// This function implements the BFS algorithm and returns the visited nodes
export const bfsOrDfs = (algo, dimension, nodeS, nodeF) => {
    
    // If BFS = QUEUE (FIFO)
    /* PUSH: ADD AT LAST | POP: REMOVE AT LAST*/
    
    // If DFS = STACK (LIFO)
    /* UNSHIFT: ADD AT BEGINNING | SHIFT: REMOVE AT BEGINNING */

    // This variable holds the open nodes (coordinate) [x, y]
    const paths = [[nodeS["col"], nodeS["row"]]];
    let visited = []
   
    let i = 0;
    // While the are nodes to visit
    while (paths) {
        console.log(`%c Loop ${i}`, 'color: red');

        // If BFS, removes node from the start of the queue || start of the array
        // If DFS, removes node from the top of the stack || end of the array
        let node = algo === 'BFS' ? paths.shift(): paths.pop();
        console.log({node})
        
        // Check the valid neighbours
        validNeighbours(algo, paths, visited, node, dimension);

        // Check if we found the node
        if (findNodeF(paths, visited, nodeF)) {
            console.log({paths})
            break;
        }
        i++;
    }

    console.log({visited})
    return visited;

}

// This functions checks the neighbours and returns a list of the visited (valid) ones 
function validNeighbours(algo, paths, visited, node, dimension) {

    /* DIMENSION: 0 = ROW | 1 = COLUMN */
    const maxRows = dimension[0]; 
    const maxColums = dimension[1]; 

    // Getting the coordinate of the given node
    const x = node[0];
    const y = node[1];

    // Checks UP
    if (y - 1 >= 0) {
        // Check if it was visited already
        // if DFS, break
        if (!wasVisited([x, y - 1])) {
            addVisitedNode(algo, paths, visited, [x, y - 1])
            if (algo === 'DFS') return ;
        }
    }
    
    // Checks RIGHT
    if (x + 1 <= maxColums - 1) {
        if (!wasVisited([x + 1, y])) {
            addVisitedNode(algo, paths, visited, [x + 1, y]);
            if (algo === 'DFS') return ;
        }
    }
    
    // Checks DOWN
    if (y + 1 <= maxRows - 1) {
        if (!wasVisited([x, y + 1])) {
            addVisitedNode(algo, paths, visited, [x, y + 1]);
            if (algo === 'DFS') return ;
        }
    }
    
    // Checks LEFT
    if (x - 1 >= 0) {
        if (!wasVisited([x - 1, y])) {
            addVisitedNode(algo, paths, visited, [x - 1, y]);
            if (algo === 'DFS') return ;
        }
    }
}

function findNodeF(paths, visited, nodeF) {
    // Traversing throught the nodes
    for (let i = 0; i < paths.length; i++) {
        // console.log(`%c Current Node[${i}] x:${node[0]} y:${node[1]}`, 'color: blue');
        // Check if the node is the same as the one passed by args (the destination)
        // Row  is the y axis and column is the x axis
        let node = paths[i];
        if ( node[1] === nodeF["row"] && node[0] === nodeF["col"]) {
            console.log(`%c Found`, 'color: brown');
            
            // Getting the coordinates to remove nodeF from visited nodes
            let index = visited.indexOf([node[0],node[1]]);
            visited.splice(index, 1);

            document.getElementById(`${node[0]},${node[1]}`).style.background = "yellow";
            return true;
        }
    }
    return false;
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

function addVisitedNode(algo, paths, visited, coordinate) {
    // If not and BFS, adds the node to the end of the queue || end of the array
    if (algo === 'BFS') {
        paths.push(coordinate);
        visited.push(coordinate);

    // If not and DFS, adds the node to the top of the stack || start of the array
    } else {
        paths.unshift(coordinate);
        visited.push(coordinate);
    }
}
