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
  data: ListNode<T>[];
  size: number;

  peek: () => T;
  pop: () => T;
  insert: (item: T) => void;
  insertAt?: (item: T, index: number) => void;
  deleteAt?: (item: T, index: number) => void;
}

export interface ListNode<T> {
  value: T;
}
