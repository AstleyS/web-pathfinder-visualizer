export const bfsAlgo = (grid, nodeS, nodeF) => {

    const dimensions = [grid[0].length, grid.length];

    const paths = [[0,0]];
    const visited = [];

   
    let i = 0;
    while (i < 10) {
        console.log(`%c Na loop ${i}`, 'color: red');
        validNeighbours(paths, visited, paths[0], dimensions);
        if (findNodeF(paths, nodeF)) break;
        visited.push(paths.shift());
        i++;
    }

}

// This functions checks the neighbours and change the state (background color) of the valid ones
function validNeighbours(paths, visited, coordinates, dimensions) {

    const col = coordinates[0];
    const row = coordinates[1];

    // Checks UP
    if (row - 1 > 0) {
        if (!wasVisited(visited, [col, row - 1]))
            paths.push([col, row - 1]);
    }
    // Checks DOWN
    if (row + 1 <= dimensions[1] - 1) {
        if (!wasVisited(visited, [col, row + 1]))
            paths.push([col, row + 1]);
    }
    // Checks LEFT
    if (col - 1 > 0) {
        if (!wasVisited(visited, [col - 1, row]))
            paths.push([col - 1, row]);
    }
    // Checks RIGHT
    if (col + 1 <= dimensions[0] - 1) {
        if (!wasVisited(visited, [col + 1, row]))
            paths.push([col + 1, row]);
    }
    
    console.log(paths.length);
    paths.forEach(cell => {
        document.getElementById(`${cell[0]},${cell[1]}`).style.background = "lightblue";
    });
}

function findNodeF(paths, nodeF) {
    console.log(`row:${nodeF["row"]} col:${nodeF["col"]}`)
    for(let i = 0; i < paths.length; i++) {
        for(let j = 0; j < paths[0].length; j++) {
            let cell = paths[i][j];
            console.log(`%c Cell[${i}][${j}] row:${cell[i]} col:${cell[j]}`, 'color: blue');
            if (cell[j] === nodeF["col"] && cell[i] === nodeF["row"]) {
                return true;
            }
        }
    }
    return false
}


function wasVisited(visited, coordinates) {
    for(let i = 0; i < visited.length; i++) {
        for(let j = 0; j < visited[0].length; j++) {
            let cell = visited[i][j];
            if (cell[j] === coordinates[0] && cell[i] === coordinates[1]) {
                return true;
            }
        }
    }
    return false
}