import { MinHeap } from "../interfaces/Heap";

// If a > b, then it should return true
export type EqualityFunction<T> = (a: T, b: T) => boolean;

/**
 * Min binary heap implementation
 *
 * Pass in equality function if using objects
 */
const defaultComparisonFunction: EqualityFunction<any> = (a: any, b: any) => {
  return a < b;
};
export class MinBinaryHeap<T> implements MinHeap<T>, Iterable<T> {
  data: T[];
  comparisonFunction: EqualityFunction<T>;

  constructor(arr?: Iterable<T>, compareFn?: EqualityFunction<T>) {
    this.data = [];
    if (compareFn) {
      this.comparisonFunction = compareFn;
    } else {
      this.comparisonFunction = defaultComparisonFunction;
    }

    if (arr) {
      const elements = Array.from(arr);
      elements.forEach((el) => {
        this.insert(el);
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
    if (index <= this.data.length - 1) {
      return this.data[index];
    }
    return null;
  }

  /**
   * Return the value at the top of the queue
   * @returns T
   */
  peekMin(): T | null {
    if (this.data.length >= 1) {
      return this.data[0];
    }
    return null;
  }

  /**
   * Heap Modification
   */

  /**
   * Removes and returns the top element of the queue
   * @returns T
   */
  extractMin(): T | null {
    if (this.data.length === 0) {
      return null;
    }

    if (this.data.length === 1) {
      return this.data[0];
    }

    if (this.data.length >= 2) {
      // First, swap the first and last element
      this.swap(this, 0, this.data.length - 1);
      // Second, remove the last element from data array, since it is now the smallest element
      const minValue = this.data.pop();

      // Heapify Down the root node to restore heap order
      this.heapifyDown(this, 0);

      if (minValue) {
        return minValue;
      } else {
        return null;
      }
    }
    return null;
  }

  /**
   * Insertion of an element to the heap - O(logi)
   * @param item
   * @param key Denotes the priority of the item
   */
  insert(newNode: T): void {
    if (!newNode) return;

    if (this.data.length === 0) {
      this.data.push(newNode);
      return;
    }

    // Add a heap node to the final position
    this.data.push(newNode);
    const newNodeIndex = this.data.length - 1;
    // Maintain heap invariant
    this.heapifyUp(this, newNodeIndex);
  }

  /**
   * Delete an item from the heap
   * 1. Maintain Heap Length Invariant (n -> n-1 items in array) by swapping
   * the last element to the hole
   * 2. Either heapify up if key is smaller than parent, or down, or do nothing
   * @param nodeIndex index to be deleted
   */
  delete(nodeIndex: number): void {
    const lastElement = this.data.pop();
    if (lastElement) {
      this.data[nodeIndex] = lastElement;
      const parentIndex = this.getParentNodeIndex(nodeIndex);
      const parentNode = this.data[parentIndex];

      const leftChildIndex = this.getLeftChildIndex(nodeIndex);
      const leftChildNode = this.data[leftChildIndex];

      const rightChildIndex = this.getRightChildIndex(nodeIndex);
      const rightChildNode = this.data[rightChildIndex];

      const shouldHeapifyUp: boolean = this.comparisonFunction(
        lastElement,
        parentNode
      );

      const shouldHeapifyDown: boolean =
        this.comparisonFunction(leftChildNode, lastElement) ||
        this.comparisonFunction(rightChildNode, lastElement);

      if (shouldHeapifyUp) {
        this.heapifyUp(this, nodeIndex);
      } else if (shouldHeapifyDown) {
        this.heapifyDown(this, nodeIndex);
      } else {
        return;
      }
    }
  }
  /**
   * Heap invariants
   */
  getLeftChild(nodeIndex: number): T | never {
    const leftChildIndex = this.getLeftChildIndex(nodeIndex);
    return this.data[leftChildIndex];
  }

  getLeftChildIndex(nodeIndex: number): number {
    return 2 * nodeIndex;
  }

  getRightChild(nodeIndex: number): T | never {
    const rightChildIndex = this.getRightChildIndex(nodeIndex);
    return this.data[rightChildIndex];
  }

  getRightChildIndex(nodeIndex: number): number {
    return 2 * nodeIndex + 1;
  }

  getParentNodeIndex(nodeIndex: number): number {
    return Math.floor(nodeIndex / 2);
  }

  heapifyUp(heap: MinHeap<T>, nodeIndex: number) {
    // Base case
    let parentIndex = this.getParentNodeIndex(nodeIndex);
    // If nodeIndex not > 0, then it should be the first node
    if (nodeIndex > 0) {
      // We want to swap if the new item is smaller than it's parent
      let shouldSwap = this.comparisonFunction(
        heap.data[nodeIndex],
        heap.data[parentIndex]
      );
      if (shouldSwap) {
        this.swap(heap, nodeIndex, parentIndex);

        // Recursively fix heap invariant issues going UP the heap
        this.heapifyUp(heap, parentIndex);
      }
    }
  }

  heapifyDown(heap: MinHeap<T>, nodeIndex: number) {
    let len = heap.data.length;
    let smallestChildNodeIndex: number = 0;

    // If the nodeIndex is already a leaf node do nothing
    if (2 * nodeIndex >= len) {
      return;
    }
    // Else we are heapifyDowning on an element in the "middle" of heap
    else if (2 * nodeIndex < len) {
      const node = heap.data[nodeIndex];
      // TODO: does this work with root node? ie 2 elements, leftChild will return the root node at idx 0, rightChild will return right node
      const leftChild = this.getLeftChild(nodeIndex);
      const rightChild = this.getRightChild(nodeIndex);
      // Get the smallest index between the two children
      if (!rightChild) {
        smallestChildNodeIndex = this.getLeftChildIndex(nodeIndex);
      } else if (!leftChild) {
        smallestChildNodeIndex = this.getRightChildIndex(nodeIndex);
      }
      // If both exist, compare the two, on ties, it doesnt matter
      else {
        this.comparisonFunction(leftChild, rightChild)
          ? (smallestChildNodeIndex = this.getLeftChildIndex(nodeIndex))
          : (smallestChildNodeIndex = this.getRightChildIndex(nodeIndex));
      }
    }
    // This case occurs when we have a "almost complete" balanced binary-heap
    else if (2 * nodeIndex === len) {
      smallestChildNodeIndex = 2 * nodeIndex;
    }

    // Swap if the child node is SMALLER
    let shouldSwap: boolean = this.comparisonFunction(
      heap.data[smallestChildNodeIndex],
      heap.data[nodeIndex]
    );
    if (shouldSwap) {
      this.swap(heap, nodeIndex, smallestChildNodeIndex);
      // Recursively fix heap invariant issues going DOWN the heap
      this.heapifyDown(heap, smallestChildNodeIndex);
    }
  }
  /**
   * Utility Functions
   */

  [Symbol.iterator](): Iterator<T, any, undefined> {
    // TODO: Needs testing
    return {
      next: () => {
        let poppedValue = this.extractMin();
        if (poppedValue) {
          return { value: poppedValue, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }

  /**
   * Swap two elements of a given Heap
   * @param heap
   * @param heapNodeIndexA child node index
   * @param heapNodeIndexB parent node index
   */
  swap(heap: MinHeap<T>, heapNodeIndexA: number, heapNodeIndexB: number) {
    const temp = heap.data[heapNodeIndexA];
    heap.data[heapNodeIndexA] = heap.data[heapNodeIndexB];
    heap.data[heapNodeIndexB] = temp;
  }
}
