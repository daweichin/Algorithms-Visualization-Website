import { Graph } from "./Graph";
import { GridNode, NodeType } from "./Node";
import { Action } from "./Plan";

/**
 *  Grid starts at 0,0, in top left corner
 *  Directions represents directions in 2d plane
 *  Reasoning: "To go right, i need to add 1 to the ycoord"
 *  Right = [0, 1]
 *  Left = [0, -1]
 *  Up, = [-1, 0]
 *  Down = [1, 0]
 *
 * @param directionArray
 * @returns
 */
const DIRECTIONS: Map<Action, number[]> = new Map();
DIRECTIONS.set(Action.RIGHT, [0, 1]);
DIRECTIONS.set(Action.LEFT, [0, -1]);
DIRECTIONS.set(Action.DOWN, [1, 0]);
DIRECTIONS.set(Action.UP, [-1, 0]);

export interface IGrid extends Graph {
  gridSize: number;
  // Map of if a node has been visited before.
  isVisited: Map<string, boolean>;

  getNeighbours: (node: GridNode) => Array<[GridNode, Action]>;
}

export class Grid implements IGrid {
  gridSize: number;
  // Represent as a 2-d matrix, eg: nodes[2][1] = 2nd col 1st row = coords of(2,1)
  nodes: GridNode[][];
  // Key for the below is a string, of structure x,y
  // What i need is a valuetype of "Point", but
  isVisited: Map<string, boolean> = new Map<string, boolean>();
  adjListWithAction: Map<string, Array<[GridNode, Action]>>;

  public constructor(gridSize: number) {
    this.gridSize = gridSize;
    this.nodes = Array.from(Array(gridSize), () => new Array(gridSize));
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        let node: GridNode = new GridNode(i, j);
        this.nodes[i][j] = node;
      }
    }
    this.adjListWithAction = this.generateAdjacencyLists();
  }

  // If trying to get node (1,2), xCoord should be 1, yCoord should be 2
  // eg: nodes[1][2] ==> 1st col, 2nd row,
  public getNode(xCoord: number, yCoord: number): GridNode {
    return this.nodes[xCoord][yCoord];
  }

  public updateNode(xCoord: number, yCoord: number, node: GridNode) {
    console.log(`UPDATING ${xCoord}, ${yCoord}`);
    this.nodes[xCoord][yCoord] = node;
  }

  public toggleNodeType(xCoord: number, yCoord: number, node: GridNode) {
    node.type = NodeType.Wall;
    this.nodes[xCoord][yCoord] = node;
  }

  public setNodeType(xCoord: number, yCoord: number, nodeType: NodeType) {
    this.nodes[xCoord][yCoord].type = nodeType;
  }

  public generateAdjacencyLists(): Map<string, Array<[GridNode, Action]>> {
    let adjList = new Map<string, Array<[GridNode, Action]>>();
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        let node: GridNode = new GridNode(i, j, NodeType.Normal);
        adjList.set(node.toString(), this.getNeighbours(node));
        this.isVisited.set(node.toString(), false);
      }
    }
    return adjList;
  }

  public getNeighbours(node: GridNode): Array<[GridNode, Action]> {
    let neighbours: Array<[GridNode, Action]> = [];

    for (const [key, value] of DIRECTIONS.entries()) {
      // EG: If direction is right, the num array is [1,0]
      // so (1,1) -> (2,1), moving right
      // the yCoord needs to go up 1, in terms of the grid[col][row]
      const newX = node.xCoord + value[0];
      const newY = node.yCoord + value[1];
      // Check for corner / edge cases
      const neighbourExistsInGrid =
        newX >= 0 && newX < this.gridSize && newY >= 0 && newY < this.gridSize;
      if (neighbourExistsInGrid) {
        // Cannot simply push a new gridNode, need to get the existing one out of the grid?
        let gridNode = this.getNode(newX, newY);
        // let gridNode1 = new GridNode(newX, newY);
        // debugger;
        neighbours.push([gridNode, key]);
      }
    }
    // Once a node has it's neighbours explored, it should be considered as expanded.
    return neighbours;
  }
}
