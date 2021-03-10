export const dijkstraAlgo = (dimension, nodeS, nodeF) => {

    /* UNSHIFT: ADD AT BEGINNING | SHIFT: REMOVE AT BEGINNING */

    // This variable holds the open nodes (coordinate)
    const paths = [{ node: nodeS, cost: 0}]
    const visited = []
    
    let i = 0;
    while (paths.length > 0) {
        console.log(`%c Loop ${i}`, 'color: red');

        let { node, cost } = paths.unshift()
        
        if (findNodeF(node, nodeF)) {
            nodeF.previous = node;
        }
        
        visited.push(node);

        // for next in graph[vertex] - set(paths):
        //     if next[0] not in v:
        //         custo = custo + next[1]
        //     # sorted(paths + [next], key = lambda x: x[1])
        //         q.append((next[0], paths + [vertex], custo))
        //         q.sort(key=lambda x:x[2])
    }
}

function findNodeF(node, nodeF) {
    if (node["row"] === nodeF["row"] && node["col"] === nodeF["col"]) {
        console.log(`%c Found`, 'color: brown');
        
        return true;
    }
}