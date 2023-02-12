import { Grid } from "../../models/Grid";
import { GridNode, NodeType } from "../../models/Node";
import { Action, Plan } from "../../models/Plan";
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
  let priorityQueue: MinHeapPriorityQueue<GridNode> = new MinHeapPriorityQueue<GridNode>();

  // Prevent the start node from being re-visited
  let expandedNodes: GridNode[] = [];
  grid.isVisited.set(startNode.toString(), true);
  expandedNodes.push(startNode)

  let rootChildren: Array<[GridNode, Action]> = grid.getNeighbours(startNode);
  rootChildren.forEach((tuple) => {
    // Include the first node and it shows up in path
    // tuple[0].path.push([startNode, Action.NONE])
    const childNode = tuple[0]
    const action = tuple[1]
    childNode.path.push([childNode, action]);
    expandedNodes.push(childNode);

    const manHattanDistance = getManhattanDistance(childNode, goalNode)
    childNode.cost = manHattanDistance
    priorityQueue.insert(childNode, childNode.cost)
  });

  let nodeToExplore = priorityQueue.extractMin() 

  // iterative A*
  while(priorityQueue.heap.data.length > 0 && nodeToExplore != undefined)
  {
    // Same as BFS
    grid.isVisited.set(nodeToExplore.toString(), true);

    // 1. Check if Goal
    if(nodeToExplore.equals(goalNode))
    {
      expandedNodes.forEach((n) => {
        n.type = NodeType.Expanded;
      });
      return {finalSteps: nodeToExplore.path, expandedNodes: expandedNodes}
    }

    // 2. Mark node as expanded 
    expandedNodes.push(nodeToExplore)

    // 3. Explore Children
    let childNodes: [GridNode, Action][] = grid.getNeighbours(nodeToExplore);
    let unvisitedChildNodes: [GridNode, Action][] = childNodes.filter(
      (n) => grid.isVisited.get(n[0].toString()) === false
    );

    unvisitedChildNodes.forEach((dirNodeTuple) => {
      let newNode = dirNodeTuple[0];
      let action = dirNodeTuple[1];
      // Assign the existing path then push the action
      // BUG: Needs a new ref
      // NOTE: Taking out the if check, TS thinks nodeToExplore can be null even though
      // we have a check in the outer while loop?
      if(nodeToExplore) newNode.path = [...nodeToExplore.path];
      newNode.path.push([newNode, action]);

      expandedNodes.push(newNode);
      const manHattanDistance = getManhattanDistance(newNode, goalNode)
      newNode.cost = manHattanDistance
      priorityQueue.insert(newNode, newNode.cost);
    });

    nodeToExplore = priorityQueue.extractMin()
  }
  return {finalSteps: [], expandedNodes: expandedNodes}
};
