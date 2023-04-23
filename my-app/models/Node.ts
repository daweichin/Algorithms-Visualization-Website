import { Action } from "./Plan";

/**
 * A type for each node.
 * Expanded means that the node has had it's neighbours explored.
 */
export enum NodeType {
  Normal = "Normal",
  Start = "Start",
  Goal = "Goal",
  Wall = "Wall",
  Expanded = "Expanded",
  Path = "Path",
}

export interface IGridNode {
  xCoord: number;
  yCoord: number;
  action?: Action;
  path: [GridNode, Action][];
  neighbours?: GridNode[];
  type: NodeType;
}

export class GridNode implements IGridNode {
  id: string;
  xCoord: number;
  yCoord: number;
  path: [GridNode, Action][];
  neighbours: GridNode[];
  type: NodeType;
  action: Action | undefined; // Represents the action taken from this node
  cost: number | undefined; // Some algorithms associate a cost of the node to the goal
  pathNumber: number | undefined;

  public constructor(
    xCoord: number,
    yCoord: number,
    type: NodeType = NodeType.Normal
  ) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.neighbours = [];
    this.type = type;
    this.path = [];
    this.pathNumber = undefined;
    // expression style from c# props
    this.id = this.toString();
  }

  public toString = () => {
    return `${this.xCoord},${this.yCoord}`;
  };

  public equals = (node: GridNode) => {
    return this.xCoord === node.xCoord && this.yCoord === node.yCoord;
  };

  public toggleType = () => {
    // if normal, turn into wall
    if (this.type === NodeType.Normal) {
      console.log("WALL SET");
      this.type = NodeType.Wall;
    }
  };
}
