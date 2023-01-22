import LinkedList, { ListNode } from "./linkedList";

/**
 * A custom iterator, based on the ideas from:
 * https://www.carloscaballero.io/understanding-iterator-pattern-in-javascript-typescript-using-symbol-iterator/
 * https://www.geekabyte.io/2019/06/typing-iterables-and-iterators-with.html
 */

export class LinkedListIterator<T> implements Iterator<T> {
  private list: LinkedList<T>;
  private currentNode: ListNode<T> | undefined;

  constructor(list: LinkedList<any>) {
    this.list = list;
    this.currentNode = this.list.head;
  }

  next(...args: [] | [undefined]): IteratorResult<T, any> {
    if (this.currentNode != null) {
      let val = this.currentNode.value;
      this.currentNode = this.currentNode.next;
      return { done: false, value: val };
    } else {
      return { done: true, value: undefined };
    }
  }
  return?(value?: any): IteratorResult<T, any> {
    throw new Error("Method not implemented.");
  }
  throw?(e?: any): IteratorResult<T, any> {
    throw new Error("Method not implemented.");
  }
}
