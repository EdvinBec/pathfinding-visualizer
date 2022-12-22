import React, { useEffect, useState } from "react";
import { dijkstra } from "../algorithms/dijkstra";
import { NodeType } from "../interfaces";
import Node from "./Node";

type Props = {};

const GRID_WIDTH = 50;
const GRID_HEIGHT = 20;
const NODE_START_ROW = 10;
const NODE_START_COL = 5;
const NODE_FINISH_ROW = 15;
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
      <button
        onClick={() => {
          const shortestPath = dijkstra(
            grid,
            grid[NODE_START_ROW][NODE_START_COL],
            grid[NODE_FINISH_ROW][NODE_FINISH_COL]
          );
          for (const node of shortestPath) {
            const { row, col } = node;
            const div = document.querySelector(`.${"s" + col + "s" + row}`);
            div?.classList.add(`isVisited`);
          }

          console.log(shortestPath);
        }}
      >
        Start Dijkstra
      </button>
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
                  node={node}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const getInitialGrid = (width: number, height: number) => {
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

const createNewNode = (col: number, row: number) => {
  return {
    col,
    row,
    isStart: row === NODE_START_ROW && col === NODE_START_COL,
    isFinish: row === NODE_FINISH_ROW && col === NODE_FINISH_COL,
    isVisited: false,
    distance: Infinity,
    previousNode: null,
    isWall: false,
  };
};

export default Grid;
