import { Graph } from "./Graph";
import { GridNode, NodeType } from "./Node";
import { Action } from "./Plan";

// Right, Left, Up, Down
const DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const mapDirectionEnumToArray = (directionArray: number[]): Action => {
  if (directionArray[0] === 1) {
    return Action.RIGHT;
  } else if (directionArray[0] === -1) {
    return Action.LEFT;
  } else if (directionArray[1] === 1) {
    return Action.DOWN;
  } else if (directionArray[1] === -1) {
    return Action.UP;
  }
  return Action.NONE;
};

export interface IGrid extends Graph {
  gridSize: number;
  isVisited: Map<string, boolean>;

  // TODO: Investigate why TS is complaining with the below call
  // getNeighbour: (point: Point) => Array<[Directions,Point]>;
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
    this.adjListWithAction = this.generateAdjacencyLists();
    this.nodes = Array.from(Array(gridSize), () => new Array(gridSize));
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        let node: GridNode = new GridNode(i, j);
        this.nodes[i][j] = node;
      }
    }
  }

  public updateNode(xCoord: number, yCoord: number, node: GridNode) {
    this.nodes[yCoord][xCoord] = node;
  }

  public setNodeType(xCoord: number, yCoord: number, nodeType: NodeType) {
    this.nodes[yCoord][xCoord].type = nodeType;
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
    // Check for corner / edge cases
    let neighbours: Array<[GridNode, Action]> = [];
    DIRECTIONS.forEach((d) => {
      const newX = node.xCoord + d[0];
      const newY = node.yCoord + d[1];
      const neighbourExistsInGrid =
        newX >= 0 && newX < this.gridSize && newY >= 0 && newY < this.gridSize;
      if (neighbourExistsInGrid) {
        neighbours.push([new GridNode(newX, newY), mapDirectionEnumToArray(d)]);
      }
    });
    return neighbours;
  }
}
