import { Grid } from "../../models/Grid";
import { GridNode } from "../../models/Node";
import { Action, Plan } from "../../models/Plan";

/**
 * Params:
 * Input: <Grid, StartNode, EndNode, SearchAlgorithm>
 * Output: Plan
 */
export const AStarSearch = (
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
  // Astar uses a PQ, which is ordered in ascending order of cost based on the heuristic
  // Manhattan Distance used as Heuristic
  let priorityQueue: PriorityQueue<GridNode> = new PriorityQueue<GridNode>();
};
