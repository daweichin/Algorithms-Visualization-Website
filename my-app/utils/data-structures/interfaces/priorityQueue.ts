/**
 * Priority Queue ADT Interface
 *
 * Naming inspired directly from JKET Algo Book
 *
 */
export interface PriorityQueue<T> {
  /**************************************************
   * Manipulation Methods
   **************************************************/

  /**
   *  Initialize Heap
   */
  startHeap: () => void;

  /**
   *  Add element to PQ
   * @param item
   */
  insert: (item: T, key: number) => void;

  /**
   *  Remove highest priority of PQ, or undefined if PQ is empty
   */
  extractMin: () => T | null;

  /**
   *  Delete item at index in PQ
   */
  delete: (index: number) => void;

  /**************************************************
   * Query Methods
   **************************************************/

  findMin: () => T | null;
}

export interface Node<T> {
  // Nodes must have a number typed key
  // For simple cases where the caller is a primitive such as number, the key can just be set to the value
  // However, for more advanced cases such as a queue of objects, it is down to the implementation to
  // supply a number based key to determine priority
  key: number;
  value: T;
}
