export const bfsAlgo = (grid, nodeS, nodeF) => {

    // This variable holds the open nodes (coordinates) [x, y]
    const paths = [[nodeS["col"], nodeS["row"]]];
    // This variable holds the paths visited
    const visited = [];
   
    let i = 0;
    console.log({paths})
    while (paths) {
        console.log(`%c Na loop ${i}`, 'color: red');
        let node = paths.shift();
        validNeighbours(paths, visited, node, grid.length);
        console.log({node})
        if (findNodeF(paths, nodeF)) break;
        visited.push(node);
        i++;
    }
}

// This functions checks the neighbours and change the state (background color) of the valid ones
function validNeighbours(paths, visited, node, dimension) {

    // Getting the coordinates of the given node
    const x = node[0];
    const y = node[1];

    // Checks UP
    if (y - 1 >= 0) {
        // Check if it was visited already
        if (!wasVisited(visited, [x, y - 1]))
            paths.push([x, y - 1]); // If not add to the paths
    }
    // Checks DOWN
    if (y + 1 <= dimension - 1) {
        if (!wasVisited(visited, [x, y + 1]))
            paths.push([x, y + 1]);
    }
    // Checks LEFT
    if (x - 1 >= 0) {
        if (!wasVisited(visited, [x - 1, y]))
            paths.push([x - 1, y]);
    }
    // Checks RIGHT
    if (x + 1 <= dimension - 1) {
        if (!wasVisited(visited, [x + 1, y]))
            paths.push([x + 1, y]);
    }
    
    // For each node in the path, we will change its color
    paths.forEach(node => {
        document.getElementById(`${node[0]},${node[1]}`).style.background = "lightblue";
    });
}

function findNodeF(paths, nodeF) {
    // Traversing throught the nodes
    for (let i = 0; i < paths.length; i++) {
        let node = paths[i];
        // console.log(`%c Current Node[${i}] x:${node[0]} y:${node[1]}`, 'color: blue');
        // Check if the node is the same as the one passed by args (the destination)
        // Row  is the y axis and column is the x axis
        if ( node[1] === nodeF["row"] && node[0] === nodeF["col"]) {
            console.log(`%c Found`, 'color: brown');
            document.getElementById(`${node[0]},${node[1]}`).style.backgroundColor = "yellow";
            return true;
        }
    }
    return false
}


// This function checks if the node was already visited
function wasVisited(visited, coordinates) {
    // Traversing throught the nodes
    for(let i = 0; i < visited.length; i++) {
        let node = visited[i];
        // Check if the node is the same as the one passed by args 
        if (node[0] === coordinates[0] && node[1] === coordinates[1]) {
            return true;
        }
    }
    return false
}