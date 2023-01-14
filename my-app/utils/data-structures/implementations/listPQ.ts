import { PriorityQueue, ListNode } from "../interfaces/priorityQueue";

/**
 * Implementation of a Priority Queue using a List
 * peek: O(1)
 * pop: O(n)
 * insert: O(1)
 */
export default class ListPQ<T> implements PriorityQueue<ListNode<T>> {
  data: ListNode<T>[] = [];
  size: number = 0;
  minPointerIndex: number = 0;

  constructor(initialData: T[]) {
    initialData.forEach((e) => {
      let newNode: ListNode<T> = { value: e };
      this.insert(newNode);
    });
  }

  public peek = (): ListNode<T> => {
    return this.data[this.minPointerIndex];
  };

  public pop = (): ListNode<T> => {
    let poppedItem = this.data[this.minPointerIndex];
    // Remove the popped item
    this.data.splice(this.minPointerIndex, 1);
    // Find the next smallest element
    this.updateSmallestPointerIndex();
    this.size -= 1;
    return poppedItem;
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

  public insert = (item: ListNode<T>) => {
    if (this.data.length === 0) {
      this.data.push(item);
      this.size += 1;
    } else if (item.value < this.data[this.minPointerIndex].value) {
      this.data.push(item);
      this.size = this.size + 1;
      this.minPointerIndex = this.size - 1;
    } else {
      this.data.push(item);
      this.size += 1;
    }
  };
}
