import { EqualityFunction, MinBinaryHeap } from "../core/MinHeap";
import { PriorityQueue } from "../interfaces/PriorityQueue.js";

/**
 * Implementation of a Priority Queue using a Binary Heap,
 * N-bounded implementation with a dynamic array
 *
 * peek: O(1)
 * pop: O(logn)
 * insert: O(logn)
 *
 *  Usage Example:
 *  Primitive Based
 *  const arr = [1, 2, 3, 4, 5];
 *  const list: HeapPQ<number> = new ListPQ(arr);
 *
 *  Object Based -
 *  const arr = [{"xCoord": 1, "yCoord": 1 "cost": 1}, {"id": 2, "cost": 2}, {"id": 3, "cost": 3}];
 *  const list: MinHeapPriorityQueue<GridNode> = new MinHeapPriorityQueue<GridNode>("cost");
 */

// NOTE: To use this class with objects, a keyPropName MUST be supplied
export default class MinHeapPriorityQueue<T> implements PriorityQueue<T> {
  heap: MinBinaryHeap<T>;

  constructor(arr?: Iterable<T>, compareFn?: EqualityFunction<T>) {
    this.heap = new MinBinaryHeap<T>(arr, compareFn);
  }

  // HACK: Not really sure if I need this if I already have a ctor
  // maybe might be useful to have a "reset" heap or something?s
  startHeap(): void {
    this.heap = new MinBinaryHeap<T>();
  }

  insert(item: T): void {
    this.heap.insert(item);
  }

  extractMin(): T | null {
    if (!this.heap.data) return null;
    return this.heap.extractMin();
  }

  delete(index: number): void {
    this.heap.delete(index);
  }

  findMin(): T | null {
    if (!this.heap.data) return null;

    return this.heap.peekMin();
  }
}
