export const bfsAlgo = (dimension, nodeS, nodeF) => {
    
    // QUEUE (FIFO)
    // This variable holds the open nodes (coordinate) [x, y]
    const paths = [[nodeS["col"], nodeS["row"]]];
   
    let i = 0;
    while (paths) {
        console.log(`%c Loop ${i}`, 'color: red');

        // Removes node from the start of the queue || start of the array
        let node = paths.shift();
        validNeighbours(paths, node, dimension);
        
        console.log({node})

        if (findNodeF(paths, nodeF)) break;
        i++;
    }
}

// This functions checks the neighbours and change the state (background color) of the valid ones
function validNeighbours(paths, node, dimension) {

    // Getting the coordinate of the given node
    const x = node[0];
    const y = node[1];

    // Checks UP
    if (y - 1 >= 0) {
        // Check if it was visited already
        if (!wasVisited([x, y - 1])) {
            // If not, adds the node to the start of the queue || start of the array
            paths.push([x, y - 1]);
            addColor([x, y - 1]);
        }
    }
    
    // Checks RIGHT
    if (x + 1 <= dimension - 1) {
        if (!wasVisited([x + 1, y])) {
            paths.push([x + 1, y]);
            addColor([x + 1, y]);
        }
    }
    
    // Checks DOWN
    if (y + 1 <= dimension - 1) {
        if (!wasVisited([x, y + 1])) {
            paths.push([x, y + 1]);
            addColor([x, y + 1]);
        }
    }
    
    // Checks LEFT
    if (x - 1 >= 0) {
        if (!wasVisited([x - 1, y])) {
            paths.push([x - 1, y]);
            addColor([x - 1, y]);
        }
    }
}

function findNodeF(paths, nodeF) {
    // Traversing throught the nodes
    for (let i = 0; i < paths.length; i++) {
        // console.log(`%c Current Node[${i}] x:${node[0]} y:${node[1]}`, 'color: blue');
        // Check if the node is the same as the one passed by args (the destination)
        // Row  is the y axis and column is the x axis
        let node = paths[i];
        if ( node[1] === nodeF["row"] && node[0] === nodeF["col"]) {
            console.log(`%c Found`, 'color: brown');
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

    // If not, adds
    node.classList.add("visited");
    return false;
}

// This function adds color to the cell of the grid where the node is
function addColor(coordinate) {
    document.getElementById(`${coordinate[0]},${coordinate[1]}`).style.background = "lightblue";
}