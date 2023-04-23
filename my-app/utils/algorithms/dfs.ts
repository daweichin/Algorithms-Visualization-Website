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

  // Stack represents the nodes to be explored
  let stack: GridNode[] = [];
  stack.push(startNode);

  while (stack.length > 0) {
    let currentNode = stack.pop() as GridNode;

    if (currentNode.equals(endNode)) {
      expandedNodes.forEach((n) => (n.type = NodeType.Normal));
      return {
        finalSteps: currentNode.path,
        expandedNodes: expandedNodes,
        goalReached: true,
      };
    }

    let childNodes: [GridNode, Action][] = grid.getNeighbours(currentNode);
    currentNode.type = NodeType.Expanded;
    expandedNodes.push(currentNode);

    let nodesToExplore: [GridNode, Action][] = childNodes.filter((n) => {
      let isNodeUnvisited = grid.isVisited.get(n[0].toString()) === false;
      let isNeighbourAWall = n[0].type === NodeType.Wall;
      return isNodeUnvisited && !isNeighbourAWall;
    });

    nodesToExplore.forEach((dirNodeTuple) => {
      let childNode = dirNodeTuple[0];
      let action = dirNodeTuple[1];

      grid.isVisited.set(childNode.id, true);
      // Assign the existing path then push the action
      childNode.path = [...currentNode.path];
      childNode.path.push([childNode, action]);
      stack.push(childNode);
    });
  }

  expandedNodes.forEach((n) => (n.type = NodeType.Normal));

  return { finalSteps: [], expandedNodes: expandedNodes, goalReached: false };
};
