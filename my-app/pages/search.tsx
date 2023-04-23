/// <reference path="../typings/tsd.d.ts" />
import React, { memo, useEffect, useState } from "react";
import GridLayout from "./grid";
import { Button, Stack, TextField } from "@mui/material";
import { GridNode, NodeType } from "../models/Node";
import SpeedIcon from "@mui/icons-material/Speed";
import Slider from "@mui/material/Slider";

const SearchPage = () => {
  // debug mode - smaller grid to work with
  // const [startNodeX, setStartNodeX] = useState<number>(0);
  // const [startNodeY, setStartNodeY] = useState<number>(0);
  // const [endNodeX, setEndNodeX] = useState<number>(15);
  // const [endNodeY, setEndNodeY] = useState<number>(15);
  // const [gridSize, setGridSize] = useState<number>(16);

  const [startNodeX, setStartNodeX] = useState<number>(8);
  const [startNodeY, setStartNodeY] = useState<number>(4);
  const [endNodeX, setEndNodeX] = useState<number>(8);
  const [endNodeY, setEndNodeY] = useState<number>(12);
  // gridsize must > end x and y
  const [gridSize, setGridSize] = useState<number>(16);
  const [animationSpeed, setAnimationSpeed] = useState<number>(500);

  let startNode = new GridNode(startNodeX, startNodeY);
  startNode.type = NodeType.Start;
  let endNode = new GridNode(endNodeX, endNodeY);
  endNode.type = NodeType.Goal;

  return (
    <div>
      <h2>Search Algorithms</h2>
      <div className="controls">
        <TextField
          InputProps={{
            type: "number",
            inputProps: { min: 0, max: gridSize - 1 },
          }}
          label="Start X"
          variant="outlined"
          size="small"
          value={startNodeX}
          onChange={(e) => {
            setStartNodeX(parseInt(e.target.value));
          }}
        />
        <TextField
          InputProps={{
            type: "number",
            inputProps: { min: 0, max: gridSize - 1 },
          }}
          label="Start Y"
          variant="outlined"
          size="small"
          value={startNodeY}
          onChange={(e) => setStartNodeY(parseInt(e.target.value))}
        />
        <TextField
          InputProps={{
            type: "number",
            inputProps: { min: 0, max: gridSize - 1 },
          }}
          label="End X"
          variant="outlined"
          size="small"
          value={endNodeX}
          onChange={(e) => setEndNodeX(parseInt(e.target.value))}
        />
        <TextField
          InputProps={{
            type: "number",
            inputProps: { min: 0, max: gridSize - 1 },
          }}
          label="End Y"
          variant="outlined"
          size="small"
          value={endNodeY}
          onChange={(e) => setEndNodeY(parseInt(e.target.value))}
        />
        <TextField
          InputProps={{
            type: "number",
            inputProps: { min: 0, max: 200 },
          }}
          label="Grid Size"
          variant="outlined"
          size="small"
          value={gridSize}
          onChange={(e) => setGridSize(parseInt(e.target.value))}
        />

        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <SpeedIcon />
          <Slider
            size="small"
            aria-label="Volume"
            value={animationSpeed}
            onChange={(e, n) => setAnimationSpeed(n as number)}
            defaultValue={1000}
            step={100}
            max={3000}
            min={300}
            marks
          />
        </Stack>
      </div>

      <GridLayout
        startNode={startNode}
        endNode={endNode}
        gridSize={gridSize}
        animationSpeed={animationSpeed}
      />
    </div>
  );
};

export default SearchPage;
