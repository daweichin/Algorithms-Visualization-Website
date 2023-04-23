import { start } from "repl";
import { Grid } from "../../models/Grid";
import { GridNode, NodeType } from "../../models/Node";
import { Action, Plan } from "../../models/Plan";
import { EqualityFunction } from "../data-structures/core/MinHeap";
import MinHeapPriorityQueue from "../data-structures/implementations/MinHeapPriorityQueue";
import { getManhattanDistance } from "../utils";

/**
 * Params:
 * Input: <Grid, StartNode, EndNode, SearchAlgorithm>
 * Output: Plan
 */
export const AStarSearch = (
  grid: Grid,
  startNode: GridNode,
  goalNode: GridNode
): Plan => {
  // Expanded nodes are ones that are already visited
  // Queue represents frontier nodes
  // Astar uses a PQ, which is ordered in ascending order of cost based on the heuristic
  // Manhattan Distance used as Heuristic
  const comparisonFunction: EqualityFunction<GridNode> = (
    a: GridNode,
    b: GridNode
  ) => {
    if (a.cost && b.cost) {
      // break ties with false - no change to the order of two nodes with same priority
      if (a.cost === b.cost) {
        return false;
      }
      return a.cost < b.cost;
    }
    // TODO: is there a better fallback? Seems like it should throw an exception if it gets to here or let
    // callers know that cost prop is missing
    return false;
  };
  let priorityQueue: MinHeapPriorityQueue<GridNode> =
    new MinHeapPriorityQueue<GridNode>([], comparisonFunction);

  // Prevent the start node from being re-visited
  let expandedNodes: GridNode[] = [];
  grid.isVisited.set(startNode.toString(), true);

  const manHattanDistance = getManhattanDistance(startNode, goalNode);
  startNode.cost = manHattanDistance;
  priorityQueue.insert(startNode);

  // iterative A*
  while (priorityQueue.heap.data.length > 0) {
    // Same as BFS
    let nodeToExplore = priorityQueue.extractMin();

    if (!nodeToExplore) {
      alert("Search done, no goal found.");
      break;
    }

    // Check if Goal
    if (nodeToExplore.equals(goalNode)) {
      expandedNodes.forEach((n) => (n.type = NodeType.Normal));

      return {
        finalSteps: nodeToExplore.path,
        expandedNodes: expandedNodes,
        goalReached: true,
      };
    }

    // 3. Add Unvisited Children to PQ
    let childNodes: [GridNode, Action][] = grid.getNeighbours(nodeToExplore);
    nodeToExplore.type = NodeType.Expanded;
    expandedNodes.push(nodeToExplore);

    // console.log(childNodes);
    // debugger;
    let nodesToExplore: [GridNode, Action][] = childNodes.filter((n) => {
      let isNodeUnvisited = grid.isVisited.get(n[0].toString()) === false;
      let isNeighbourAWall = n[0].type === NodeType.Wall;
      return isNodeUnvisited && !isNeighbourAWall;
    });

    /// find out which node is the smallest and add to the priority queue
    nodesToExplore.forEach((dirNodeTuple) => {
      let newNode = dirNodeTuple[0];
      let action = dirNodeTuple[1];

      if (nodeToExplore) {
        // only insert the new node if the heuristic is better
        newNode.cost = getManhattanDistance(newNode, goalNode);
        if (newNode.cost <= getManhattanDistance(nodeToExplore, goalNode)) {
          grid.isVisited.set(newNode.id, true);

          newNode.path = [...nodeToExplore.path];
          newNode.path.push([newNode, action]);
          priorityQueue.insert(newNode);
        }
      }
    });
  }

  // TODO: this step should probably be OUTSIDE this function, ie since it's responsible for visualization, it should be in the caller
  // and not in here.
  expandedNodes.forEach((n) => (n.type = NodeType.Normal));

  return { finalSteps: [], expandedNodes: expandedNodes, goalReached: false };
};
