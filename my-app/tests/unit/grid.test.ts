import { Grid } from "../../models/Grid";
import { GridNode } from "../../models/Node";

describe("GridTestContainer", () => {
  describe("GetNeighbours_NewGrid_ReturnsCorrectly", () => {
    it.only("Should get the neighbours correctly", () => {
      let grid = new Grid(8);

      let gridNode = new GridNode(1, 1);

      var neighbours = grid.getNeighbours(gridNode);
      console.log(neighbours);
    });
  });
});
