import { PriorityQueue, Node } from "../interfaces/priorityQueue";

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
 *  const arr = [{"id": 1, "key": 1}, {"id": 2, "key": 2}, {"id": 3, "key": 3}];
 *  const list: HeapPQ<object> = new ListPQ(arr);
 */

export interface HeapNode<T> extends Node<T> {
  // Parent can be undefined if it is root node
  parent: HeapNode<T> | undefined;
  // Left/Right Child can be undefined if they are at the "bottom" of heap
  leftChild: HeapNode<T> | undefined;
  rightChild: HeapNode<T> | undefined;
}

type NodeObject = {
  key: number;
  [prop: string]: any;
};

export default class HeapPQ<T extends number | NodeObject>
  implements PriorityQueue<T>
{
  data: HeapNode<T>[];
  size: number;

  constructor(arr?: Iterable<T>, keyPropName: string = "key") {
    this.data = [];
    this.size = 0;

    // If keyPropName is supplied, we have an object PQ
    // HACK: This means the object HAS to have a KeyValuePair<keyPropName, number>
    if (arr && keyPropName) {
      const elements = Array.from(arr);
      elements.forEach((el) => {
        const elObj = el as NodeObject;
        this.insert(el, elObj[keyPropName] as number);
      });
    }

    if (arr) {
      const elements = Array.from(arr);
      elements.forEach((el) => {
        const key = el as number;
        this.insert(el, key);
      });
    }
  }

  /**********
   * Heap data access
   **********/

  /**
   * Get a value at any index of the heap - O(1)
   * @param index
   * @returns
   */
  get(index: number): T | null {
    if (index < this.data.length) {
      return this.data[index].value;
    }
    return null;
  }

  /**
   * Return the value at the top of the queue
   * @returns T
   */
  peek(): T {
    return this.data[0].value;
  }

  /**
   * Heap Modification
   */

  /**
   * Removes and returns the top element of the queue
   * @returns T
   */
  pop(): T | undefined {
    if (this.data) {
      return this.data[0].value;
    }
    return undefined;
  }

  /**
   * Insertion of an element to the heap - O(logi)
   * @param item
   * @param key Denotes the priority of the item
   */
  insert(item: T, key: number): void {
    if (!item) return;

    let newListNode: HeapNode<T> = {
      value: item,
      key: key,
      parent: undefined,
      leftChild: undefined,
      rightChild: undefined,
    };

    // Add a heap node to the final position
    const newNodeIndex = this.size + 1;
    newListNode.parent = this.data[this.parentNodeIndex(newNodeIndex)];
    this.data[newNodeIndex] = newListNode;
    this.size++;

    // Maintain heap invariant
    this.heapifyUp(this, newNodeIndex);
  }

  /**
   * Heap invariants
   */
  leftChild(nodeIndex: number): HeapNode<T> | never {
    const leftChildIndex = 2 * nodeIndex;
    return this.data[leftChildIndex];
  }
  rightChild(nodeIndex: number): HeapNode<T> | never {
    const rightChildIndex = 2 * nodeIndex + 1;
    return this.data[rightChildIndex];
  }

  parentNodeIndex(nodeIndex: number): number {
    return Math.floor(nodeIndex / 2);
  }

  heapifyUp(heap: HeapPQ<T>, childIndex: number) {
    if (childIndex > 1) {
      let parentIndex = this.parentNodeIndex(childIndex);
      // If our newly inserted item breaks the min-heap invariant
      if (heap.data[childIndex].key < heap.data[parentIndex].key) {
        this.swap(heap, childIndex, parentIndex);
        this.heapifyUp(heap, parentIndex);
      }
    }
  }

  /**
   * Utility Functions
   */

  /**
   * Swap two elements of a given Heap
   * @param heap
   * @param heapNodeIndexA child node index
   * @param heapNodeIndexB parent node index
   */
  swap(heap: HeapPQ<T>, heapNodeIndexA: number, heapNodeIndexB: number) {
    const temp = heap.data[heapNodeIndexA];
    heap.data[heapNodeIndexA] = heap.data[heapNodeIndexB];
    heap.data[heapNodeIndexB] = temp;
  }
}
