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

export interface PriorityQueue<ListNode> {
  data: ListNode[];
  size: number;

  peek: () => ListNode;
  pop: () => ListNode;
  insert: (item: ListNode) => void;
  insertAt?: (item: ListNode, index: number) => void;
  deleteAt?: (item: ListNode, index: number) => void;
}

export interface ListNode<T> {
  value: T;
}
