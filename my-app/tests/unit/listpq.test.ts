import ListPQ from "../../utils/data-structures/implementations/listPQ";

describe("test", () => {
  // beforeAll()
  // afterAll()

  describe("Create List", () => {
    it("should create a list of numbers", () => {
      const arr = [1, 2, 3, 4, 5];
      const list = new ListPQ(arr);

      expect(list).not.toBeNull();
    });

    it("should create a list of strings", () => {
      const arr = ["a", "b", "c", "d"];
      const list = new ListPQ(arr);

      expect(list).not.toBeNull();
    });
  });
});
