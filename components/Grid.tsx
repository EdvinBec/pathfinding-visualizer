import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gridReduxState, NodeType, startFinishPosition } from "../interfaces";
import { saveGrid } from "../redux/gridSlice";
import Node from "./Node";

type Props = {
  currentAction: string;
  notify: any;
  newGrid: boolean;
};

const Grid = ({ currentAction, notify, newGrid }: Props) => {
  const startNodePosition = useSelector(
    (state: any) => state.grid.startPosition
  );
  const finishNodePosition = useSelector(
    (state: any) => state.grid.finishPosition
  );
  const grid = useSelector((state: gridReduxState) => state.grid);

  const dispatch = useDispatch();

  const [isMouseDown, setIsMouseDown] = useState<boolean>(); //State for placing walls down
  const [gridCopy, setGridCopy] = useState<Array<Array<NodeType>>>(); //Saving grid in local state so it updates component on change

  /**
   * On first load create initial grid and save it into redux store
   */
  useEffect(() => {
    const initialGrid = getInitialGrid(
      grid.gridWidth,
      grid.gridHeight,
      startNodePosition,
      finishNodePosition
    );
    dispatch(saveGrid({ grid: initialGrid }));
  }, [newGrid]);

  /**
   * Here we listen for any changes in redux grid state, so we can update component
   */
  useEffect(() => {
    setGridCopy(grid.grid);
  }, [grid]);

  return (
    <div
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {gridCopy?.map((row: Array<NodeType>, rowIdx: number) => {
        return (
          <div key={rowIdx} className="gridRow">
            {row.map((node: NodeType, nodeIdx: number) => {
              const { isFinish, isStart, col, row, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  isFinish={isFinish}
                  isStart={isStart}
                  col={col}
                  row={row}
                  isWall={isWall}
                  currentAction={currentAction}
                  isMouseDown={isMouseDown}
                  previousStart={{
                    x: startNodePosition.x,
                    y: startNodePosition.y,
                  }}
                  previousFinish={{
                    x: finishNodePosition.x,
                    y: finishNodePosition.y,
                  }}
                  notify={notify}
                ></Node>
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
