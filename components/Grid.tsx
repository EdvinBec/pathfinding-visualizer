import React, { useEffect, useState } from "react";

type Props = {};

const GRID_WIDTH = 50;
const GRID_HEIGHT = 25;

const Grid = (props: Props) => {
  /**
   * Here we have defined new state, to generate grid only once
   * on components first load
   */
  const [grid, setGrid] = useState<Array<Array<Object>>>();

  useEffect(() => {
    const initialGrid = getInitialGrid(GRID_WIDTH, GRID_HEIGHT);
    setGrid(initialGrid);
  }, []);

  return (
    <div>
      {grid?.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="gridRow">
            {row.map((node, nodeIdx) => {
              return <div key={nodeIdx} className="node"></div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

const getInitialGrid = (width: Number, height: Number) => {
  const grid = [];
  for (let row = 0; row < height; row++) {
    const rowNodes = [];
    for (let col = 0; col < width; col++) {
      rowNodes.push(createNewNode(col, row));
    }
    grid.push(rowNodes);
  }

  return grid;
};

const createNewNode = (col: Number, row: Number) => {
  return { col, row };
};

export default Grid;
