import { Node, PriorityQueue } from "../interfaces/PriorityQueue";

/**
 * Implementation of a Priority Queue using a List
 *
 * peek: O(1)
 * pop: O(n)
 * insert: O(1)
 *
 * Usage: let listPQ: ListPQ<number>
 */

interface ListNode<T> extends Node<T> {}

export default class ListPriorityQueue<T extends number> {
  data: ListNode<T>[] = [];
  length: number = 0;
  minPointerIndex: number = 0;

  constructor(initialData: T[]) {
    initialData.forEach((e) => {
      // HACK: This cast basically means this ListPQ will only work for numbers
      // TODO: Add string/object support
      this.push(e, e);
    });
  }

  shift?: (() => T | undefined) | undefined;
  unshift?: ((item: T) => void) | undefined;
  insertAt?: ((item: T, index: number) => void) | undefined;
  removeAt?: ((index: number) => void) | undefined;

  /**
   * Returns the value with the "minimum" priority - O(1)
   * @returns
   */
  public peek = (): T => {
    let listNode = this.data[this.minPointerIndex];
    return listNode.value;
  };

  /**
   * Removes and Returns the value with the "minimum" priority - O(n)
   * @returns
   */
  public pop = (): T => {
    let poppedListNode = this.data[this.minPointerIndex];
    let poppedValue = poppedListNode.value;
    // Remove the popped item
    this.data.splice(this.minPointerIndex, 1);
    // Find the next smallest element
    this.updateSmallestPointerIndex();
    this.length -= 1;
    return poppedValue;
  };

  private updateSmallestPointerIndex = () => {
    let min = this.data[0];
    let minIdx = 0;
    this.data.forEach((e, i) => {
      if (e.value < min.value) {
        min = e;
        minIdx = i;
      }
    });
    this.minPointerIndex = minIdx;
  };

  /**
   * Insert a new item - O(1)
   * @param item
   * @param key - Comparison Key of the inserted item
   */
  public push = (item: T, key?: number) => {
    /**
     * TODO: Had to make "key" optional to match interface sig
     * TODO: guard clause to ensure key is assignable later on
     *  */
    if (!key) return;

    let newListNode: ListNode<T> = { value: item, key: key };
    // If there is no data, just add to data
    if (this.data.length === 0) {
      this.data.push(newListNode);
      this.length += 1;
    }
    // Otherwise, if the incoming node is smaller than the current min, update the min
    // NOTE: the comparitor assumes the values are comparable
    else if (newListNode.value < this.data[this.minPointerIndex].value) {
      this.data.push(newListNode);
      this.length = this.length + 1;
      this.minPointerIndex = this.length - 1;
    }
    // Otherwise, just add the node in
    else {
      this.data.push(newListNode);
      this.length += 1;
    }
  };

  [Symbol.iterator](): Iterator<T, any, undefined> {
    // TODO: Needs testing
    return {
      next: () => {
        let poppedValue = this.pop();
        if (poppedValue) {
          return { value: poppedValue, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
