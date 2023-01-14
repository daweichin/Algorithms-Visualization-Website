import { Type } from "typescript";
import { Action } from "./Plan";

export enum NodeType {
    Normal="Normal",
    Start="Start",
    Goal="Goal",
    Wall="Wall",
    Expanded="Expanded",
    Path="Path"
  }  

export interface IGridNode {
    xCoord: number;
    yCoord: number;
    action?: Action
    path: [GridNode, Action][]
    neighbours?: GridNode[];
    type: NodeType;
}

export class GridNode implements IGridNode {
  xCoord: number;
  yCoord: number;
  action?: Action | undefined;
  path: [GridNode, Action][]
  neighbours: GridNode[];
  type: NodeType;

  public constructor(xCoord: number, yCoord: number, type: NodeType = NodeType.Normal) {
    this.xCoord = xCoord
    this.yCoord = yCoord
    this.neighbours = []
    this.type = type
    this.path = []
  }

  public toString = () => {
    return `${this.xCoord},${this.yCoord}`
  }

  public equals = (node: GridNode) => {
      return this.xCoord === node.xCoord && this.yCoord === node.yCoord
  }
}