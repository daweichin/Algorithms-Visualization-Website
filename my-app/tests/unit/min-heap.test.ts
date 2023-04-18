import { Grid } from "../../models/Grid";
import { GridNode, NodeType } from "../../models/Node";
import {
  EqualityFunction,
  MinBinaryHeap,
} from "../../utils/data-structures/core/MinHeap";

const comparisonFunction: EqualityFunction<GridNode> = (
  a: GridNode,
  b: GridNode
) => {
  if (a.cost && b.cost) {
    // break ties with false - no change to the order of two nodes with same priority
    if (a.cost === b.cost) {
      return false;
    }
    return a.cost < b.cost;
  }
  // TODO: is there a better fallback? Seems like it should throw an exception if it gets to here or let
  // callers know that cost prop is missing
  return false;
};

describe("HeapTestsContainer", () => {
  // beforeAll()
  // afterAll()

  describe("ParentNodeIndex_MinHeap_ReturnsCorrectly", () => {
    it("Should correctly return parent node index", () => {
      let heapnode1: GridNode = new GridNode(0, 0, NodeType.Normal);
      heapnode1.cost = 123;

      let heapnode2: GridNode = new GridNode(1, 1, NodeType.Normal);
      heapnode2.cost = 345;

      let heapnode3: GridNode = new GridNode(2, 2, NodeType.Normal);
      heapnode3.cost = 4567;

      const minHeap = new MinBinaryHeap(
        [heapnode1, heapnode2, heapnode3],
        comparisonFunction
      );

      expect(minHeap.getParentNodeIndex(0)).toEqual(0);
      expect(minHeap.getParentNodeIndex(1)).toEqual(0);
      expect(minHeap.getParentNodeIndex(2)).toEqual(1);
    });
  });

  describe("Create_EmptyMinHeap_ReturnsNewMinHeap", () => {
    it("Should create a new Min Heap with no elements", () => {
      var arr: GridNode[] = [];
      const minHeap = new MinBinaryHeap(arr);

      expect(minHeap).not.toBeNull();
      expect(minHeap.data).toHaveLength(0);
    });
  });

  describe("Create_NonEmptyMinHeap_ReturnsNewMinHeap", () => {
    it("Should create a new Min Heap with a few elements", () => {
      let heapnode1: GridNode = new GridNode(0, 0, NodeType.Normal);
      heapnode1.cost = 123;

      let heapnode2: GridNode = new GridNode(1, 1, NodeType.Normal);
      heapnode2.cost = 345;

      let heapnode3: GridNode = new GridNode(2, 2, NodeType.Normal);
      heapnode3.cost = 4567;

      const minHeap = new MinBinaryHeap(
        [heapnode1, heapnode2, heapnode3],
        comparisonFunction
      );

      expect(minHeap).not.toBeNull();
      expect(minHeap.data).toHaveLength(3);
    });
  });

  describe("Insert_NonEmptyMinHeap_NewElementInserted", () => {
    it("Inserts into minheap", () => {
      let heapnode1: GridNode = new GridNode(0, 0, NodeType.Normal);
      heapnode1.cost = 123;

      let heapnode2: GridNode = new GridNode(1, 1, NodeType.Normal);
      heapnode2.cost = 345;

      let heapnode3: GridNode = new GridNode(2, 2, NodeType.Normal);
      heapnode3.cost = 4567;

      const minHeap = new MinBinaryHeap(
        [heapnode1, heapnode2],
        comparisonFunction
      );

      minHeap.insert(heapnode3);

      expect(minHeap).not.toBeNull();
      expect(minHeap.data).toHaveLength(3);
    });
  });

  describe("Pop_MinHeap_CorrectlyReturns", () => {
    it("Pop from minheap", () => {
      let heapnode1: GridNode = new GridNode(0, 0, NodeType.Normal);
      heapnode1.cost = 123;

      let heapnode2: GridNode = new GridNode(1, 1, NodeType.Normal);
      heapnode2.cost = 345;

      let heapnode3: GridNode = new GridNode(2, 2, NodeType.Normal);
      heapnode3.cost = 4567;

      const minHeap = new MinBinaryHeap(
        [heapnode1, heapnode2, heapnode3],
        comparisonFunction
      );
      var heapNodePopped1 = minHeap.extractMin();
      expect(minHeap).not.toBeNull();
      expect(heapNodePopped1?.cost).toEqual(123);
    });
  });

  describe("PopMultiple_MinHeap_CorrectlyReturns", () => {
    it("Pops multi elements from minheap", () => {
      let heapnode1: GridNode = new GridNode(0, 0, NodeType.Normal);
      heapnode1.cost = 123;

      let heapnode2: GridNode = new GridNode(1, 1, NodeType.Normal);
      heapnode2.cost = 345;

      let heapnode3: GridNode = new GridNode(2, 2, NodeType.Normal);
      heapnode3.cost = 4567;

      const minHeap = new MinBinaryHeap(
        [heapnode1, heapnode2, heapnode3],
        comparisonFunction
      );

      let constMinNode1 = minHeap.extractMin();
      let constMinNode2 = minHeap.extractMin();
      let constMinNode3 = minHeap.extractMin();

      expect(minHeap).not.toBeNull();
      expect(constMinNode1?.cost).toEqual(123);
      expect(constMinNode2?.cost).toEqual(345);
      expect(constMinNode3?.cost).toEqual(4567);
    });
  });

  describe("Iterate_MinHeap_CorrectlyIterates", () => {
    it.failing("Pops multi elements from minheap", () => {
      let heapnode1: GridNode = new GridNode(0, 0, NodeType.Normal);
      heapnode1.cost = 123;

      let heapnode2: GridNode = new GridNode(1, 1, NodeType.Normal);
      heapnode2.cost = 345;

      let heapnode3: GridNode = new GridNode(2, 2, NodeType.Normal);
      heapnode3.cost = 4567;

      const minHeap = new MinBinaryHeap(
        [heapnode1, heapnode2, heapnode3],
        comparisonFunction
      );

      // TODO: Why doesnt this work when it's a iterable?
      // minHeap.forEach(e => console.log(e);)
    });
  });
});
