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
    // tuple[0].path.push([startNode, Action.NONE]);
    tuple[0].type = NodeType.Expanded;
    tuple[0].path.push([tuple[0], tuple[1]]);
    grid.isVisited.set(tuple[0].id, true);
  });
  // Stack represents the nodes to be explored
  let stack: GridNode[] = rootChildren.map((n) => {
    return n[0];
  });

  while (stack.length > 0) {
    let currentNode = stack.pop() as GridNode;

    if (
      currentNode.xCoord === endNode.xCoord &&
      currentNode.yCoord === endNode.yCoord
    ) {
      return { finalSteps: currentNode.path, expandedNodes: expandedNodes };
    }

    let childNodes: [GridNode, Action][] = grid.getNeighbours(currentNode);
    currentNode.type = NodeType.Expanded;

    childNodes.forEach((dirNodeTuple) => {
      let childNode = dirNodeTuple[0];
      let action = dirNodeTuple[1];
      let hasChildNodeBeenVisited = grid.isVisited.get(childNode.id);

      if (!hasChildNodeBeenVisited) {
        grid.isVisited.set(childNode.id, true);

        // Assign the existing path then push the action
        childNode.path = [...currentNode.path];
        childNode.path.push([childNode, action]);
        stack.push(childNode);
      }
    });
  }

  return { finalSteps: [], expandedNodes: expandedNodes };
};
