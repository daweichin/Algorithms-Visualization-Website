/**
 * POSD - Clean interface
 * Represents an unordered collection.
 * @function push adds item to end
 * @function pop removes and returns first item
 * @function insertAt
 * @function removeAt
 */
export interface List<Node> {
  head: Node;

  push: (item: Node) => void;
  pop: () => Node;
  insertAt: (item: Node, index: number) => void;
  removeAt: (index: number) => void;
}

interface LinkedListNode<T> {
  value: T;
}
