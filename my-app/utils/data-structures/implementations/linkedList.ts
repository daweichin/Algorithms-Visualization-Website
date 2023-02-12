import { Collection } from "../interfaces/Collection";
import { LinkedListIterator } from "./linkedListIterator";

// ListNodes should be instantiated without a "next" value?
export interface ListNode<T> {
  value: T;
  next: ListNode<T> | undefined;
  prev: ListNode<T> | undefined;
}

/**
 * Doubly-Linked List Implentation
 *
 * Usage: let linkedList: ListList<number> = new LinkedList<number>()
 * linkedList.push(1); linkedList.pop();
 */

export default class LinkedList<T> implements Collection<T> {
  head: ListNode<T> | undefined;
  tail: ListNode<T> | undefined;
  length: number;

  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  /**
   * Remove item from end of list - O(1)
   */
  pop = () => {
    if (this.tail) {
      this.length -= 1;
      return this.tail.value;
    }
  };

  /**
   * Remove item from start of list - O(1)
   */
  shift = () => {
    if (this.head) {
      this.length -= 1;
      return this.head.value;
    }
  };

  /**
   * Appends items to the end of the list - O(1)
   * @param item
   */
  push(item: T): void {
    let newListNode: ListNode<T> = {
      value: item,
      next: undefined,
      prev: this.tail,
    };
    // If there is no head, make the incoming item the head
    if (!this.head) {
      this.head = newListNode;
      this.length += 1;
    }
    // Otherwise, append to end of list
    else {
      if (this.tail) {
        // Assign previous tail's next to the incoming item
        this.tail.next = newListNode;
        this.tail = newListNode;
        this.length += 1;
      }
    }
  }

  /**
   * Appends items to the start of the list - O(1)
   * @param item
   */
  unshift(item: T): void {
    let newListNode: ListNode<T> = {
      value: item,
      next: this.head,
      prev: undefined,
    };

    if (this.head) {
      this.head.prev = newListNode;
      this.head = newListNode;
    }
  }

  /**
   * Inserts element at any given index in list - O(1)
   * @param item
   * @param index
   */
  insertAt = (item: T, index: number) => {
    let node = this.walkList(index);
    if (node) {
      let newNode: ListNode<T> = { value: item, next: node.next, prev: node };
      node.next = newNode;
      node.next.prev = newNode;
      this.length += 1;
    }
  };

  /**
   * Removes element at any given index in list - O(1)
   * @param index
   */
  removeAt = (index: number) => {
    let node = this.walkList(index);
    // NOTE: Not sure if this check is valid?
    if (node && node.prev && node.next) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      this.length -= 1;
    }
  };

  // Walk the list "walks" times and return the node - O(n)
  private walkList(walks: number): ListNode<T> | undefined {
    if (!this.head) return undefined;
    if (walks > this.length)
      throw Error("Number of walks is greater than length of list");

    let currentNode: ListNode<T> = this.head;

    // Walk the list
    [...Array(walks)].forEach((_, i) => {
      if (currentNode.next) {
        currentNode = currentNode.next;
      }
    });
    return currentNode;
  }

  [Symbol.iterator](): Iterator<T> {
    return new LinkedListIterator(this);
  }
}
