import { useState, useEffect } from "react";
import { GridNode } from "../models/Node";
import IHeap from "./data-structures/interfaces/Heap";

export function getWindowDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
}

interface QueueNode {
  value: any;
  priority: number;
}

interface PriorityQueue<T> {
  insert(item: T, priority: number): void;
  peek(): T;
  pop(): T;
  size(): number;
  isEmpty(): boolean;
}

// Min-Heap implementation
// DC NOTE: extends keyword in TS provides similar constraint as where keyword in C# generics
// providing us access to T.value, T.priority
// usage: let heap = Heap<QueueNode>
class Heap<T extends QueueNode> implements IHeap<T> {
  data: T[] = [];
  size: number = 0;

  public peek = () => {
    return this.data[0];
  };
  public pop = () => {
    return this.data[0];
  };
  public insert = (item: T) => {
    //
    item.value;
  };
}
