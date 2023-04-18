/// <reference path="../typings/tsd.d.ts" />
import React, { memo, useEffect, useState } from "react";

import { getWindowDimensions } from "../utils/utils";
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
    new GridNode(1, 1, NodeType.Start)
  );
  const [endNode, setEndNode] = useState<GridNode>(
    new GridNode(1, 7, NodeType.Goal)
  );
  const gridSize = 16;
  const grid = new Grid(gridSize);
  grid.setNodeType(startNode.xCoord, startNode.yCoord, NodeType.Start);
  grid.setNodeType(endNode.xCoord, endNode.yCoord, NodeType.Goal);
  const [nodes, setNodes] = useState<GridNode[][]>(grid.nodes);
  // higher speed is faster
  const [animationSpeed, setAnimationSpeed] = useState<number>(1000);

  useEffect(() => {
    const { height, width } = getWindowDimensions();
    setNodeHeight(height / grid.gridSize);
    setNodeWidth(width / grid.gridSize);
  }, []);

  const startBFSSearch = (
    grid: Grid,
    startNode: GridNode,
    endNode: GridNode
  ): void => {
    const plan: Plan = BFSSearch(grid, startNode, endNode);
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

  // TODO: Goal node gets painted over by expanding nodes and finalsteps
  const executePlanAnimation = (plan: Plan) => {
    // Once per second, input a new step of the plan
    // Adapted from
    // https://stackoverflow.com/questions/59164452/javascript-settimeout-order-of-execution

    const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
    let isPlanCompleted = false;
    (async () => {
      while (!isPlanCompleted) {
        // visualization here

        let temp: any = GetAnimationStep(plan).next();
        isPlanCompleted = temp.done;
        if (isPlanCompleted) {
          plan.finalSteps.forEach((s, i) => {
            s[0].pathNumber = i;
            s[0].type = NodeType.Path;
            updateNode(s[0], grid);
          });
          break;
        }
        let expandedNode: GridNode = temp.value;
        updateNode(expandedNode, grid);
        // Each animation frame will resolve every x ms
        await timer(1000 / animationSpeed);
      }
    })();
  };

  const updateNode = (node: GridNode, grid: Grid) => {
    if (node) {
      grid.updateNode(node.xCoord, node.yCoord, node);
      const newNodes = [...grid.nodes];
      setNodes(newNodes);
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
        {/* <button onClick={() => updateNodeColor(2, 2, grid)}>
          Update Node Color
        </button> */}
      </div>
      <div>
        {nodes.map((col, i) => (
          <div key={i} className="row-wrapper">
            {col.map((node, j) => {
              return (
                <NodeComponent
                  key={`${i},${j}`}
                  width={nodeWidth}
                  height={nodeHeight}
                  node={node}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const RowComponent = () => {
  return <div className="row-wrapper"></div>;
};

const NodeComponent = (props: {
  node: GridNode;
  width: number;
  height: number;
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
