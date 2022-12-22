import React, { useEffect, useState } from "react";
import { dijkstra } from "../algorithms/dijkstra";
import { NodeType } from "../interfaces";
import Node from "./Node";

type Props = {};

//Grid size
const GRID_WIDTH = 50;
const GRID_HEIGHT = 20;

//Start and finish node position
const NODE_START_ROW = 10;
const NODE_START_COL = 5;
const NODE_FINISH_ROW = 15;
const NODE_FINISH_COL = 45;

//Animation speed
const SEARCH_ANIMATION_SPEED = 10;
const PATH_ANIMATION_SPEED = 50;

const Grid = (props: Props) => {
  /**
   * Here we have defined new state, to generate grid only once
   * on components first load
   */
  const [grid, setGrid] = useState<Array<Array<NodeType>>>(); //Generate grid on load
  const [isMouseDown, setIsMouseDown] = useState<boolean>(); //State for placing walls down
  const [noPathMessage, setNoPathMessage] = useState(""); //If no possible path message

  /* Generate initial grid on load
    and save it in local state
  */
  useEffect(() => {
    const initialGrid = getInitialGrid(GRID_WIDTH, GRID_HEIGHT);
    setGrid(initialGrid);
  }, []);

  return (
    <div
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      <button
        onClick={() => {
          if (grid) {
            const response = dijkstra(
              grid,
              grid[NODE_START_ROW][NODE_START_COL], //Start node
              grid[NODE_FINISH_ROW][NODE_FINISH_COL] //Finish node
            );

            const { visitedNodesInOrder, shortestPath, errorMsg } = response;

            animateDijkstra(visitedNodesInOrder, shortestPath);
            if (errorMsg) {
              //If there are any error print them out
              setNoPathMessage(errorMsg);
            }
          }
        }}
      >
        Start Dijkstra
      </button>
      {grid?.map((row, rowIdx) => {
        //Displaying already generated grid
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
                  isMouseDown={isMouseDown}
                />
              );
            })}
          </div>
        );
      })}
      <h1>{noPathMessage}</h1>
    </div>
  );
};

const animateDijkstra = (
  visitedNodesInOrder: Array<NodeType>,
  shortestPath: Array<NodeType>
) => {
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    const { row, col } = visitedNodesInOrder[i];

    const div = document.querySelector(`.${"c" + col + "r" + row}`);

    setTimeout(() => {
      div?.classList.add(`searching`);

      if (i === visitedNodesInOrder.length - 1) {
        animateShortestPath(shortestPath);
      }
    }, SEARCH_ANIMATION_SPEED * i);
  }
};

const animateShortestPath = (path: Array<NodeType>) => {
  for (let i = 0; i < path.length; i++) {
    const { row, col } = path[i];

    const div = document.querySelector(`.${"c" + col + "r" + row}`);

    setTimeout(() => {
      div?.classList.add(`isVisited`);
    }, PATH_ANIMATION_SPEED * i);
  }
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
