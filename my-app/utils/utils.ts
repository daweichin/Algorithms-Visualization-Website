import { GridNode } from "../models/Node";

export function getWindowDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
}

export function getEuclideanDistance(gridNode1: GridNode, gridNode2: GridNode): number{
  return Math.sqrt(Math.pow(gridNode1.xCoord - gridNode2.xCoord, 2) 
  + Math.pow(gridNode1.yCoord - gridNode2.yCoord, 2))
}

export function getManhattanDistance(gridNode1: GridNode, gridNode2: GridNode): number{
  return Math.abs(gridNode1.xCoord - gridNode2.xCoord) 
  + Math.abs(gridNode1.yCoord - gridNode2.yCoord)
}