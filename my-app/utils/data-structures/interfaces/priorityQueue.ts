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

export interface PriorityQueue<T> {
  data: Node<T>[];
  size: number;

  peek: () => T | undefined;
  pop: () => T | undefined;
  insert: (item: T, key: number) => void;
  insertAt?: (item: T, key: number, index: number) => void;
  deleteAt?: (item: T, index: number) => void;
}

export interface Node<T> {
  // Nodes must have a number typed key
  // For simple cases where the caller is a primitive such as number, the key can just be set to the value
  // However, for more advanced cases such as a queue of objects, it is down to the implementation to
  // supply a number based key to determine priority
  key: number;
  value: T;
}
