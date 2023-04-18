/**
 * @param data
 * @param size
 * @param peek Returns the element of the queue with the smallest key
 * @param pop Removes and returns the element of the queue with the smallest key
 * @param insert represents
 * @param insertAt represents
 * @function insertAt represents
 * @test insertAt represents
 */

export interface MinHeap<T> {
  // Use built-in JS dynamic array
  data: T[];

  peekMin: () => T | null;
  extractMin: () => T | null;
  insert: (item: T) => void;
  insertAt?: (item: T, index: number) => void;
  deleteAt?: (item: T, index: number) => void;

  heapifyUp: (heap: MinHeap<T>, index: number) => void;
  heapifyDown: (heap: MinHeap<T>, index: number) => void;
}
