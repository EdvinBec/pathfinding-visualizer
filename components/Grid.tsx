import React, { useEffect, useState } from "react";
import { NodeType } from "../interfaces";
import Node from "./Node";

type Props = {};

const GRID_WIDTH = 50;
const GRID_HEIGHT = 20;
const NODE_START_ROW = 10;
const NODE_START_COL = 5;
const NODE_FINISH_ROW = 10;
const NODE_FINISH_COL = 45;

const Grid = (props: Props) => {
  /**
   * Here we have defined new state, to generate grid only once
   * on components first load
   */
  const [grid, setGrid] = useState<Array<Array<NodeType>>>();

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
              const { col, row, isStart, isFinish } = node;
              return (
                <Node
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  col={col}
                  row={row}
                />
              );
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
  return {
    col,
    row,
    isStart: row === NODE_START_ROW && col === NODE_START_COL,
    isFinish: row === NODE_FINISH_ROW && col === NODE_FINISH_COL,
  };
};

export default Grid;
