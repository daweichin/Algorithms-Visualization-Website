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
    new GridNode(1, 2, NodeType.Goal)
  );
  const gridSize = 4;
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
    // this is a hack, TODO: find out best way to do this (eg in vue probably wouldve events or something)
    grid.nodes = gridNodes;
    const plan: Plan = await BFSSearch(grid, startNode, endNode);
    console.log(plan);
    executePlanAnimation(plan);
  };

  const startDFSSearch = (
    grid: Grid,
    startNode: GridNode,
    endNode: GridNode
  ): void => {
    const plan: Plan = DFSSearch(grid, startNode, endNode);
    executePlanAnimation(plan);
  };

  const startAStarSearch = (
    grid: Grid,
    startNode: GridNode,
    endNode: GridNode
  ): void => {
    const plan: Plan = AStarSearch(grid, startNode, endNode);
    executePlanAnimation(plan);
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

        // ISSUE: by the time we get to the first update, lots of nodes have their internal state set as "expanded"
        //
        let temp: any = GetAnimationStep(plan).next();
        isPlanCompleted = temp.done;
        // Once the plan is done, visualize the path
        if (isPlanCompleted) {
          console.log("PLAN DONE");
          plan.finalSteps.forEach((s, i) => {
            s[0].pathNumber = i;
            s[0].type = NodeType.Path;
            updateNode(s[0], grid);
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

  // Update one node at a time - intended for animation purposes
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
      // First, get the most up to date state before updating
      // SUPER hacky, 100% not the right way props
      grid.nodes = gridNodes;
      grid.toggleNodeType(node.xCoord, node.yCoord, node);
      let newGridNodes = [...grid.nodes];
      setNodes((n) => newGridNodes);
    }
  };

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
