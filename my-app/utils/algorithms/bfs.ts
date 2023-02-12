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
  // Prevent the start node from being researched
  let expandedNodes: GridNode[] = [];
  grid.isVisited.set(startNode.toString(), true);

  let rootChildren: Array<[GridNode, Action]> = grid.getNeighbours(startNode);
  rootChildren.forEach((tuple) => {
    // Include the first node and it shows up in path
    // tuple[0].path.push([startNode, Action.NONE])
    tuple[0].path.push([tuple[0], tuple[1]]);
    expandedNodes.push(tuple[0]);
  });
  // Expanded nodes are ones that are already visited
  // Queue represents frontier nodes
  let queue: GridNode[] = rootChildren.map((n) => {
    return n[0];
  });

  while (queue.length > 0) {
    let currentNode = queue.shift() as GridNode;
    grid.isVisited.set(currentNode.toString(), true);
    // console.log(currentNode.path)
    // console.log(queue)
    if (
      currentNode.xCoord === endNode.xCoord &&
      currentNode.yCoord === endNode.yCoord
    ) {
      expandedNodes.forEach((n) => {
        n.type = NodeType.Expanded;
      });
      //   currentNode.path.forEach((tup) => {
      //     tup[0].type = NodeType.Path;
      //   });
      return { finalSteps: currentNode.path, expandedNodes: expandedNodes };
    }

    let childNodes: [GridNode, Action][] = grid.getNeighbours(currentNode);
    let unvisitedChildNodes: [GridNode, Action][] = childNodes.filter(
      (n) => grid.isVisited.get(n[0].toString()) === false
    );

    unvisitedChildNodes.forEach((dirNodeTuple) => {
      let newNode = dirNodeTuple[0];
      let action = dirNodeTuple[1];
      // Assign the existing path then push the action
      // BUG: Needs a new ref
      newNode.path = [...currentNode.path];
      newNode.path.push([newNode, action]);

      expandedNodes.push(newNode);
      queue.push(newNode);
    });
  }

  return { finalSteps: [], expandedNodes: expandedNodes };
};
