import { GridNode } from "./Node";

export interface Plan {
  finalSteps: [GridNode, Action][]; // [Position, Action]
  expandedNodes: GridNode[]; // [Position, Action]
  goalReached: boolean; // Was the goal reached?
}

export type Direction = keyof typeof Action;

export enum Action {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  NONE = "NONE",
}
