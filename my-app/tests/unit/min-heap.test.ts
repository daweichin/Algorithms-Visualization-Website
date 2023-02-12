import { MinHeap } from "../../utils/data-structures/core/MinHeap.ts";

describe("HeapTestsContainer", () => {
  // beforeAll()
  // afterAll()

  describe("Create_MinHeap_ReturnsNewMinHeap", () => {
    it("Should create a new Min Heap", () => {
      const minHeap = new MinHeap()

      expect(minHeap).not.toBeNull();
    });
  });
});
