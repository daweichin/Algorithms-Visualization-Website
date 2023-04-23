/// <reference path="../typings/tsd.d.ts" />
import React, { memo, useEffect, useState } from "react";

import { getWindowDimensions, useForceUpdate } from "../utils/utils";
import { EnumDeclaration } from "typescript";
import { Grid } from "../models/Grid";
import { NodeType, GridNode } from "../models/Node";
import { DFSSearch } from "../utils/algorithms/dfs";
import { BFSSearch } from "../utils/algorithms/bfs";
import { Plan } from "../models/Plan";
import { AStarSearch } from "../utils/algorithms/astar";

const SearchPage = () => {
  return (
    <div>
      <h1>Search Page</h1>
      <GridLayout />
    </div>
  );
};

export default SearchPage;

const GridLayout = () => {
  const [nodeHeight, setNodeHeight] = useState<number>(16);
  const [nodeWidth, setNodeWidth] = useState<number>(16);
  const [startNode, setStartNode] = useState<GridNode>(
    new GridNode(0, 0, NodeType.Start)
  );
  const [endNode, setEndNode] = useState<GridNode>(
    new GridNode(7, 7, NodeType.Goal)
  );
  const gridSize = 16;
  // This grid is a super object... if more layers then best to move to state management or something
  const grid = new Grid(gridSize);
  const [gridNodes, setNodes] = useState<GridNode[][]>(grid.nodes);

  grid.setNodeType(startNode.xCoord, startNode.yCoord, NodeType.Start);
  grid.setNodeType(endNode.xCoord, endNode.yCoord, NodeType.Goal);
  // higher speed is faster
  const [animationSpeed, setAnimationSpeed] = useState<number>(10);

  useEffect(() => {
    const { height, width } = getWindowDimensions();
    setNodeHeight(height / grid.gridSize);
    setNodeWidth(width / grid.gridSize);
  }, []);

  const startBFSSearch = async (
    grid: Grid,
    startNode: GridNode,
    endNode: GridNode
  ): Promise<void> => {
    // this is necessary as the gridNodes state may have been updated, but not the grid itself
    // this is a hack, affects all searches,
    // TODO: make it such that when a node is updated, grid.nodes is also updated too?
    grid.nodes = gridNodes;
    const plan: Plan = await BFSSearch(grid, startNode, endNode);
    executePlanAnimation(plan);
  };

  const startDFSSearch = (
    grid: Grid,
    startNode: GridNode,
    endNode: GridNode
  ): void => {
    grid.nodes = gridNodes;
    const plan: Plan = DFSSearch(grid, startNode, endNode);
    executePlanAnimation(plan);
  };

  const startAStarSearch = (
    grid: Grid,
    startNode: GridNode,
    endNode: GridNode
  ): void => {
    grid.nodes = gridNodes;
    const plan: Plan = AStarSearch(grid, startNode, endNode);
    executePlanAnimation(plan);
  };

  // Update one node at a time - intended for animation purposes
  // TODO: investigate performance, probably not as bad as i think since virtual dom but how to prove this?
  // wonder if react can be put under pressure either?
  const updateNode = (node: GridNode, grid: Grid) => {
    if (node) {
      grid.nodes = gridNodes;
      grid.updateNode(node.xCoord, node.yCoord, node);
      let newGridNodes = [...grid.nodes];
      setNodes((n) => newGridNodes);
    }
  };

  const toggleNodeType = (node: GridNode) => {
    if (node) {
      // Update the clicked node
      grid.toggleNodeType(node.xCoord, node.yCoord, node);
      // First, get the most up to date state before updating
      grid.nodes = gridNodes;
      // Get a new state to replace old state (do not directly modify state)
      let newGridNodes = [...grid.nodes];
      setNodes((n) => newGridNodes);
    }
  };

  const executePlanAnimation = (plan: Plan) => {
    // Once per second, input a new step of the plan
    // Adapted from
    // https://stackoverflow.com/questions/59164452/javascript-settimeout-order-of-execution

    const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
    let isPlanCompleted = false;
    (async () => {
      while (!isPlanCompleted) {
        // visualization here

        console.log(plan);
        let temp: any = GetAnimationStep(plan).next();
        isPlanCompleted = temp.done;
        // Once the plan is done, visualize the path
        if (isPlanCompleted) {
          console.log("PLAN DONE");
          if (plan.goalReached === false) {
            alert("All possible nodes expanded, goal was not found.");
          }
          plan.finalSteps.forEach((s, i) => {
            // immediately setup all the timers
            setTimeout(() => {
              console.log("DELAY");
              console.log(i);
              s[0].pathNumber = i;
              s[0].type = NodeType.Path;
              updateNode(s[0], grid);
            }, 100 * i);
          });
          break;
        }
        let expandedNode: GridNode = temp.value;
        expandedNode.type = NodeType.Expanded;
        // console.log(expandedNode.id);
        updateNode(expandedNode, grid);
        // Each animation frame will resolve every x ms
        await timer(1000 / animationSpeed);
      }
    })();
  };

  // Look at expanded nodes and shift it
  function* GetAnimationStep(plan: Plan) {
    while (plan.expandedNodes.length > 0) {
      let a = plan.expandedNodes.shift();
      yield a;
    }
  }

  function resetGrid(): void {
    const gridSize = 16;
    const grid = new Grid(gridSize);
    grid.setNodeType(startNode.xCoord, startNode.yCoord, NodeType.Start);
    grid.setNodeType(endNode.xCoord, endNode.yCoord, NodeType.Goal);
    setNodes(grid.nodes);
  }

  return (
    // Row then col loop
    <div className="grid-wrapper">
      <div className="flex">
        <button onClick={() => resetGrid()}>Reset</button>
        <button onClick={() => startAStarSearch(grid, startNode, endNode)}>
          A*
        </button>
        <button onClick={() => startBFSSearch(grid, startNode, endNode)}>
          BFS
        </button>
        <button onClick={() => startDFSSearch(grid, startNode, endNode)}>
          DFS
        </button>
      </div>
      <div>
        {gridNodes.map((col, i) => (
          <div key={i} className="row-wrapper">
            {col.map((node, j) => {
              return (
                <NodeComponent
                  key={`${i},${j}`}
                  width={nodeWidth}
                  height={nodeHeight}
                  node={node}
                  toggleNode={toggleNodeType}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const NodeComponent = (props: {
  node: GridNode;
  width: number;
  height: number;
  toggleNode: Function;
}) => {
  function mapNodeTypeToColor(nodeType: NodeType) {
    switch (nodeType) {
      case NodeType.Normal:
        return "white";
      case NodeType.Start:
        return "blue";
      case NodeType.Goal:
        return "green";
      case NodeType.Expanded:
        return "grey";
      case NodeType.Path:
        return "purple";
      case NodeType.Wall:
        return "black";
      default:
        return "black";
    }
  }

  let color = mapNodeTypeToColor(props.node.type);

  let style = {
    height: props.height,
    width: props.width,
    backgroundColor: color,
  };
  return (
    <div
      onClick={() => {
        console.log(`${props.node.xCoord},${props.node.yCoord}`);
        // tell the parent to update
        props.toggleNode(props.node);
      }}
      className="grid-node"
      style={style}
    >
      <div className="text-center">
        <p>{props.node.pathNumber}</p>
      </div>
    </div>
  );
};
