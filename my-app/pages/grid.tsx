import { Grid } from "../models/Grid";
import { useEffect, useState } from "react";
import { GridNode, NodeType } from "../models/Node";
import { Plan } from "../models/Plan";
import { AStarSearch } from "../utils/algorithms/astar";
import { BFSSearch } from "../utils/algorithms/bfs";
import { DFSSearch } from "../utils/algorithms/dfs";
import { getWindowDimensions } from "../utils/utils";
import Button from "@mui/material/Button";

const GridLayout = (props: {
  startNode: GridNode;
  endNode: GridNode;
  gridSize: number;
  animationSpeed: number;
}) => {
  // BUG: the reason why the start node end node works rn, is because when start and end are changed,
  // grid is reinitialize...
  let grid = new Grid(props.startNode, props.endNode, props.gridSize);

  useEffect(() => {
    const { height, width } = getWindowDimensions();
    setNodeHeight(height / grid.gridSize);
    setNodeWidth(width / grid.gridSize);
  }, []);

  useEffect(() => {
    const { height, width } = getWindowDimensions();
    setNodeHeight(height / grid.gridSize);
    setNodeWidth(width / grid.gridSize);
  }, [props.gridSize]);

  useEffect(() => {
    updateStartNode(props.startNode, grid);
  }, [props.startNode]);

  useEffect(() => {
    updateEndNode(props.endNode, grid);
  }, [props.endNode]);

  const [nodeHeight, setNodeHeight] = useState<number>(16);
  const [nodeWidth, setNodeWidth] = useState<number>(16);
  const [testGrid, setGrid] = useState<Grid>(grid);

  const [gridNodes, setNodes] = useState<GridNode[][]>(grid.nodes);

  // higher speed is faster
  const [animationSpeed, setAnimationSpeed] = useState<number>(
    props.animationSpeed
  );

  const startBFSSearch = async (grid: Grid): Promise<void> => {
    // this is necessary as the gridNodes state may have been updated, but not the grid itself
    // this is a hack, affects all searches,
    // TODO: make it such that when a node is updated, grid.nodes is also updated too?
    grid.nodes = gridNodes;
    const plan: Plan = await BFSSearch(grid, grid.startNode, grid.endNode);
    executePlanAnimation(plan);
  };

  const startDFSSearch = (grid: Grid): void => {
    grid.nodes = gridNodes;
    const plan: Plan = DFSSearch(grid, grid.startNode, grid.endNode);
    executePlanAnimation(plan);
  };

  const startAStarSearch = (grid: Grid): void => {
    grid.nodes = gridNodes;
    const plan: Plan = AStarSearch(grid, grid.startNode, grid.endNode);
    executePlanAnimation(plan);
  };

  // Update one node at a time - intended for animation purposes
  // TODO: investigate performance, probably not as bad as i think since virtual dom but how to prove this?
  // wonder if react can be put under pressure either?
  const updateNode = (node: GridNode, grid: Grid) => {
    if (node) {
      grid.nodes = gridNodes;
      grid.updateNode(node);
      let newGridNodes = [...grid.nodes];
      setNodes((n) => newGridNodes);
    }
  };

  const updateStartNode = (node: GridNode, grid: Grid) => {
    if (node) {
      grid.updateStartNode(node);
      let newGridNodes = [...grid.nodes];
      setNodes((n) => newGridNodes);
    }
  };

  const updateEndNode = (node: GridNode, grid: Grid) => {
    if (node) {
      grid.updateStartNode(node);
      let newGridNodes = [...grid.nodes];
      setNodes((n) => newGridNodes);
    }
  };

  function resetGrid(): void {
    const gridSize = props.gridSize;
    let startNode = { ...props.startNode };
    startNode.type = NodeType.Start;
    let endNode = { ...props.endNode };
    endNode.type = NodeType.Goal;
    grid = new Grid(startNode, endNode, gridSize);
    let newGridNodes = [...grid.nodes];
    setNodes((n) => newGridNodes);
  }

  const toggleNodeType = (node: GridNode) => {
    if (node) {
      // Update the clicked node
      grid.toggleNodeType(node);
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

  return (
    // Row then col loop
    <div className="grid-wrapper">
      <div className="flex">
        <Button variant="contained" onClick={() => resetGrid()}>
          Reset
        </Button>
        <Button variant="contained" onClick={() => startAStarSearch(grid)}>
          A*
        </Button>
        <Button variant="contained" onClick={() => startBFSSearch(grid)}>
          BFS
        </Button>
        <Button variant="contained" onClick={() => startDFSSearch(grid)}>
          DFS
        </Button>
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
        return "green";
      case NodeType.Goal:
        return "red";
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

export default GridLayout;
