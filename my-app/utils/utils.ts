import { GridNode } from "../models/Node";

export function getWindowDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
}

export function getEuclideanDistance(
  gridNode1: GridNode,
  gridNode2: GridNode
): number {
  return Math.sqrt(
    Math.pow(gridNode1.xCoord - gridNode2.xCoord, 2) +
      Math.pow(gridNode1.yCoord - gridNode2.yCoord, 2)
  );
}

export function getManhattanDistance(
  gridNode1: GridNode,
  gridNode2: GridNode
): number {
  return (
    Math.abs(gridNode1.xCoord - gridNode2.xCoord) +
    Math.abs(gridNode1.yCoord - gridNode2.yCoord)
  );
}

import React, { useState } from "react";
//create your forceUpdate hook
export function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}
