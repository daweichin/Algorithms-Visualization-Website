// Dikjstras Algorithm
/**
 * We can represent the graph through an object
 * @graph is the adjacency matrix, with a "start" and "finish" node 
 */

// Note to self: in a 2-d plane, the nodeKey can simply be the x-y coordinates?
interface Graph {
    Nodes : Array<Node>
}

interface Node {
    Key: [number, number],
    Distance: number,
    Neighbours: Array<{Node: Node, Distance: number}>
}

const graph = {
    start: {A: 5, B: 2},
    A: {C: 4, D: 2},
    B: {A: 8, D: 7},
    C: {D: 6, finish: 3},
    D: {finish: 1},
    finish: {}
  };

function Dikjstras(graph: Graph, startNodeKey: string, endNodeKey: string) {
    var distances = [];
    for (var i = 0; i < graph.Nodes.length; i++) distances[i] = Number.MAX_VALUE;
    distances[startNodeKey] = 0;

     var visited = [];

    while (true) {
        var shortestDistance = Number.MAX_VALUE;
        var shortestIndex = -1;
        for (var i = 0; i < graph.Nodes.length; i++) {
            if (distances[i] < shortestDistance && !visited[i]) {
                shortestDistance = distances[i];
                shortestIndex = i;
            }
        }

        console.log("Visiting node " + shortestDistance + " with current distance " + shortestDistance);

        if (shortestIndex === -1) {
            return distances;
        }
   
        for (var i = 0; i < graph[shortestIndex].length; i++) {
            if(graph[shortestIndex][i]) {}
            //...if the path over this edge is shorter...
            if (graph[shortestIndex][i] !== 0 && distances[i] > distances[shortestIndex] + graph[shortestIndex][i]) {
                //...Save this path as new shortest path.
                distances[i] = distances[shortestIndex] + graph[shortestIndex][i];
                console.log("Updating distance of node " + i + " to " + distances[i]);
            }
        }
        // Lastly, note that we are finished with this node.
        visited[shortestIndex] = true;
        console.log("Visited nodes: " + visited);
        console.log("Currently lowest distances: " + distances);
    }
}

/**
 * 
 * @param graph is the adjacency "matrix"
 */
