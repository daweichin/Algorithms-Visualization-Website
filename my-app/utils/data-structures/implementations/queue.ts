import LinkedList from "./linkedList";

class Queue<T> {
  // Composition (over inheritance)
  list: LinkedList<T>;

  constructor() {
    this.list = new LinkedList();
  }

  public enqueue(item: T): void {}
}
