import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NodeType, startFinishPosition } from "../interfaces";
import { saveGrid } from "../redux/gridSlice";
import gridSlice, { saveWalls } from "../redux/wallsSlice";
import Node from "./Node";

type Props = {
  currentAction: string;
};

//Grid size
const GRID_WIDTH = 50;
const GRID_HEIGHT = 20;

const Grid = ({ currentAction }: Props) => {
  const startNodePosition = useSelector((state: any) => state.startPosition);
  const finishNodePosition = useSelector((state: any) => state.finishPosition);
  const walls = useSelector((state: any) => state.walls.walls);

  const [grid, setGrid] = useState<Array<Array<NodeType>>>(); //Generate grid on load
  const [isMouseDown, setIsMouseDown] = useState<boolean>(); //State for placing walls down

  const initialGrid = getInitialGrid(
    GRID_WIDTH,
    GRID_HEIGHT,
    startNodePosition,
    finishNodePosition,
    walls
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveGrid({ grid: grid }));
    setGrid(initialGrid);
  }, [startNodePosition, finishNodePosition, walls, initialGrid]);

  return (
    <div
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {grid?.map((row, rowIdx) => {
        //Displaying already generated grid
        return (
          <div key={rowIdx} className="gridRow">
            {row.map((node, nodeIdx) => {
              const { col, row, isStart, isFinish, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  isWall={isWall}
                  col={col}
                  row={row}
                  isMouseDown={isMouseDown}
                  currentAction={currentAction}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const getInitialGrid = (
  width: number,
  height: number,
  startNodePosition: startFinishPosition,
  finishNodePosition: startFinishPosition,
  walls: Array<Array<unknown>>
) => {
  const grid = [];

  for (let row = 0; row < height; row++) {
    const rowNodes = [];
    for (let col = 0; col < width; col++) {
      rowNodes.push(
        createNewNode(col, row, startNodePosition, finishNodePosition, walls)
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
  finishNodePosition: startFinishPosition,
  walls: Array<Array<any>>
) => {
  return {
    col,
    row,
    isStart: row === startNodePosition.y && col === startNodePosition.x,
    isFinish: row === finishNodePosition.y && col === finishNodePosition.x,
    isVisited: false,
    distance:
      row === startNodePosition.y && col === startNodePosition.x ? 0 : Infinity,
    previousNode: null,
    isWall: walls[row][col].isWall === true,
  };
};

export default Grid;
