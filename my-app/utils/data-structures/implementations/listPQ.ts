import { PriorityQueue, Node } from "../interfaces/priorityQueue";

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

export default class ListPQ<T> implements PriorityQueue<T> {
  data: ListNode<T>[] = [];
  size: number = 0;
  minPointerIndex: number = 0;

  constructor(initialData: T[]) {
    initialData.forEach((e) => {
      // HACK: This cast basically means this ListPQ will only work for numbers
      // TODO: Add string/object support
      const numKey = e as number;
      this.insert(e, numKey);
    });
  }

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
    this.size -= 1;
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
   */
  public insert = (item: T, key: number) => {
    let newListNode: ListNode<T> = { value: item, key: key };
    // If there is no data, just add to data
    if (this.data.length === 0) {
      this.data.push(newListNode);
      this.size += 1;
    }
    // Otherwise, if the incoming node is smaller than the current min, update the min
    // NOTE: the comparitor assumes the values are comparable
    else if (newListNode.value < this.data[this.minPointerIndex].value) {
      this.data.push(newListNode);
      this.size = this.size + 1;
      this.minPointerIndex = this.size - 1;
    }
    // Otherwise, just add the node in
    else {
      this.data.push(newListNode);
      this.size += 1;
    }
  };
}
