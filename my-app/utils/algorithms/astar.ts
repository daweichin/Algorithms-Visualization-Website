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
  expandedNodes.push(startNode);

  let rootChildren: Array<[GridNode, Action]> = grid.getNeighbours(startNode);
  rootChildren.forEach((tuple) => {
    // Include the first node and it shows up in path
    // tuple[0].path.push([startNode, Action.NONE])
    const childNode = tuple[0];
    const action = tuple[1];
    childNode.path.push([childNode, action]);

    const manHattanDistance = getManhattanDistance(childNode, goalNode);
    childNode.cost = manHattanDistance;

    priorityQueue.insert(childNode);
  });

  // iterative A*
  while (priorityQueue.heap.data.length > 0) {
    // Same as BFS
    let nodeToExplore = priorityQueue.extractMin();

    if (!nodeToExplore) {
      alert("Search done, no goal found.");
      break;
    }

    // 2. Mark node as expanded
    grid.isVisited.set(nodeToExplore.toString(), true);
    nodeToExplore.type = NodeType.Expanded;
    expandedNodes.push(nodeToExplore);

    // Check if Goal
    if (nodeToExplore.equals(goalNode)) {
      console.log("GOAL FOUND");
      console.log(nodeToExplore.path);
      console.log(expandedNodes);
      return { finalSteps: nodeToExplore.path, expandedNodes: expandedNodes };
    }

    // 3. Add Unvisited Children to PQ
    let childNodes: [GridNode, Action][] = grid.getNeighbours(nodeToExplore);
    let unvisitedChildNodes: [GridNode, Action][] = childNodes.filter(
      (n) => grid.isVisited.get(n[0].toString()) === false
    );

    /// find out which node is the smallest and add to the priority queue
    unvisitedChildNodes.forEach((dirNodeTuple) => {
      let newNode = dirNodeTuple[0];
      let action = dirNodeTuple[1];

      if (nodeToExplore) {
        // only insert the new node if the heuristic is better
        newNode.cost = getManhattanDistance(newNode, goalNode);
        if (newNode.cost <= getManhattanDistance(nodeToExplore, goalNode)) {
          newNode.path = [...nodeToExplore.path];
          newNode.path.push([newNode, action]);
          priorityQueue.insert(newNode);
        }
      }
    });
  }
  return { finalSteps: [], expandedNodes: expandedNodes };
};
