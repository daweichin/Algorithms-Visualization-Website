import { Grid } from "../../models/Grid";
import { Action, Plan } from "../../models/Plan";
import { GridNode, NodeType } from "../../models/Node";

/**
 * Params:
 * Input: <Grid, StartNode, EndNode, SearchAlgorithm>
 * Output: Plan
 */
export const BFSSearch = (
  grid: Grid,
  startNode: GridNode,
  endNode: GridNode
): Plan => {
  // Expanded nodes are ones that are already visited
  let expandedNodes: GridNode[] = [];

  // Queue represents frontier nodes
  let queue: GridNode[] = [];
  grid.isVisited.set(startNode.id, true);
  // Add the startnode to the queue
  queue.push(startNode);

  // let times = 0;
  while (queue.length > 0) {
    // console.log(times++);
    let currentNode = queue.shift() as GridNode;
    // console.log("Current Node is " + currentNode.id);

    // If the goal is found, return the current path
    if (currentNode.equals(endNode)) {
      // console.log(currentNode.path);
      console.log(expandedNodes);
      expandedNodes.forEach((n) => (n.type = NodeType.Normal));
      return {
        finalSteps: currentNode.path,
        expandedNodes: expandedNodes,
      };
    }

    let childNodes: [GridNode, Action][] = grid.getNeighbours(currentNode);
    currentNode.type = NodeType.Expanded;
    // Push the node to expandedNodes list if it isn't already in there
    // Expanded nodes is used to generate the "grey" effect visually,
    expandedNodes.push(currentNode);

    let nodesToExplore: [GridNode, Action][] = childNodes.filter((n) => {
      let isNodeUnvisited = grid.isVisited.get(n[0].toString()) === false;
      let isNeighbourAWall = n[0].type === NodeType.Wall;
      console.log(isNeighbourAWall);
      return isNodeUnvisited && !isNeighbourAWall;
    });

    nodesToExplore.forEach((dirNodeTuple) => {
      let childNode = dirNodeTuple[0];
      let action = dirNodeTuple[1];

      // Set the childNode to visited, BUT NOT expanded.
      grid.isVisited.set(childNode.id, true);
      // Assign the existing nodes path
      childNode.path = [...currentNode.path];
      // Append to the path, the action to get to the new node
      childNode.path.push([childNode, action]);
      queue.push(childNode);
    });
  }

  return { finalSteps: [], expandedNodes: expandedNodes };
};
