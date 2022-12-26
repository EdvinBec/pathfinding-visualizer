import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dijkstra } from "../algorithms/dijkstra";
import { NodeType, startFinishPosition } from "../interfaces";
import Node from "./Node";

type Props = {};

//Grid size
const GRID_WIDTH = 50;
const GRID_HEIGHT = 20;

//Animation speed
const SEARCH_ANIMATION_SPEED = 10;
const PATH_ANIMATION_SPEED = 50;

const Grid = (props: Props) => {
  const startNodePosition = useSelector((state: any) => state.startPosition);
  const finishNodePosition = useSelector((state: any) => state.finishPosition);

  const [grid, setGrid] = useState<Array<Array<NodeType>>>(); //Generate grid on load
  const [isMouseDown, setIsMouseDown] = useState<boolean>(); //State for placing walls down
  const [noPathMessage, setNoPathMessage] = useState(""); //If no possible path message
  const [currentAction, setCurrentAction] = useState("");

  /* Generate initial grid on load
    and save it in local state
  */
  useEffect(() => {
    const initialGrid = getInitialGrid(
      GRID_WIDTH,
      GRID_HEIGHT,
      startNodePosition,
      finishNodePosition
    );
    setGrid(initialGrid);
  }, [startNodePosition, finishNodePosition]);

  return (
    <div
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      <button
        onClick={() => {
          if (grid) {
            const response = dijkstra(grid);

            const { visitedNodesInOrder, shortestPath, errorMsg } = response;

            animateDijkstra(visitedNodesInOrder, shortestPath);
            //If there are any error print them out
            setNoPathMessage(errorMsg);
          }
        }}
      >
        Start Dijkstra
      </button>

      <button onClick={() => setCurrentAction("start")}>Start</button>
      <button onClick={() => setCurrentAction("finish")}>Finish</button>
      <button onClick={() => setCurrentAction("wall")}>Wall</button>

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
                  currentAction={currentAction}
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

const getInitialGrid = (
  width: number,
  height: number,
  startNodePosition: startFinishPosition,
  finishNodePosition: startFinishPosition
) => {
  const grid = [];

  for (let row = 0; row < height; row++) {
    const rowNodes = [];
    for (let col = 0; col < width; col++) {
      rowNodes.push(
        createNewNode(col, row, startNodePosition, finishNodePosition)
      );
    }
    grid.push(rowNodes);
  }

  return grid;
};

const createNewNode = (
  col: number,
  row: number,
  startNodePosition: startFinishPosition,
  finishNodePosition: startFinishPosition
) => {
  return {
    col,
    row,
    isStart: row === startNodePosition.y && col === startNodePosition.x,
    isFinish: row === finishNodePosition.y && col === finishNodePosition.x,
    isVisited: false,
    distance: Infinity,
    previousNode: null,
    isWall: false,
  };
};

export default Grid;
