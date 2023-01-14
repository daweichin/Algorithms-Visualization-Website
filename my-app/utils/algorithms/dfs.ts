import { start } from "repl";
import { Grid } from "../../models/Grid";
import { Action, Plan } from "../../models/Plan";
import { GridNode, NodeType } from "../../models/Node";

/**
 * Params:
 * Input: <Grid, StartNode, EndNode, SearchAlgorithm>
 * Output: Plan
 */
export const DFSSearch = (
  grid: Grid,
  startNode: GridNode,
  endNode: GridNode
): Plan => {
  let expandedNodes: GridNode[] = [];

  // Prevent the start node from being re-searched
  grid.isVisited.set(startNode.toString(), true);
  let rootChildren: Array<[GridNode, Action]> = grid.getNeighbours(startNode);
  rootChildren.forEach((tuple) => {
    // Include the first node and it shows up in path
    tuple[0].path.push([startNode, Action.NONE]);
    tuple[0].path.push([tuple[0], tuple[1]]);
  });
  // Stack represents the nodes to be explored
  let stack: GridNode[] = rootChildren.map((n) => {
    return n[0];
  });

  while (stack.length > 0) {
    let currentNode = stack.pop() as GridNode;
    grid.isVisited.set(currentNode.toString(), true);

    if (
      currentNode.xCoord === endNode.xCoord &&
      currentNode.yCoord === endNode.yCoord
    ) {
      expandedNodes.forEach((n) => {
        n.type = NodeType.Expanded;
      });
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
      stack.push(newNode);
    });
  }

  return { finalSteps: [], expandedNodes: expandedNodes };
};
