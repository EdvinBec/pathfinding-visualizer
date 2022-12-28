import React from "react";
import { useDispatch } from "react-redux";
import { previousStartFinish } from "../interfaces";
import { saveGrid } from "../redux/gridSlice";

type Props = {
  isStart: boolean;
  isFinish: boolean;
  col: number;
  row: number;
  isMouseDown?: boolean;
  currentAction: string;
  isWall: boolean;
  previousStart: previousStartFinish;
  previousFinish: previousStartFinish;
  notify: any;
};

const Node = ({
  isStart,
  isFinish,
  isWall,
  col,
  row,
  isMouseDown,
  currentAction,
  previousStart,
  previousFinish,
  notify,
}: Props) => {
  const dispatch = useDispatch();

  const isWallClassName = isWall ? "wall" : "";
  const extraClassName = isStart ? "nodeStart" : isFinish ? "nodeFinish" : "";

  const nodeClassNames = `node ${extraClassName} ${isWallClassName} ${
    "c" + col + "r" + row
  }`;

  switch (currentAction) {
    case "start":
      if (isWall) {
        return (
          <div
            onMouseDown={() => {
              dispatch(
                saveGrid({
                  isWall: {
                    isWall: false,
                    col: col,
                    row: row,
                  },
                  previousStart: { x: previousStart.x, y: previousStart.y },
                  startPosition: { x: col, y: row },
                })
              );
            }}
            className={nodeClassNames}
          ></div>
        );
      } else if (isFinish) {
        return (
          <div
            onClick={() =>
              notify("You can't place start node on top of finish node")
            }
            className={nodeClassNames}
          ></div>
        );
      } else {
        return (
          <div
            onMouseDown={() => {
              dispatch(
                saveGrid({
                  previousStart: { x: previousStart.x, y: previousStart.y },
                  startPosition: { x: col, y: row },
                })
              );
            }}
            className={nodeClassNames}
          ></div>
        );
      }
    case "finish":
      if (isWall) {
        return (
          <div
            onClick={() => {
              dispatch(
                saveGrid({
                  isWall: {
                    isWall: false,
                    col: col,
                    row: row,
                  },
                  previousFinish: { x: previousFinish.x, y: previousFinish.y },
                  finishPosition: { x: col, y: row },
                })
              );
            }}
            className={nodeClassNames}
          ></div>
        );
      } else if (isStart) {
        return (
          <div
            onClick={() =>
              notify("You can't place finish node on top of start node")
            }
            className={nodeClassNames}
          ></div>
        );
      } else {
        return (
          <div
            onClick={() => {
              dispatch(
                saveGrid({
                  previousFinish: { x: previousFinish.x, y: previousFinish.y },
                  finishPosition: { x: col, y: row },
                })
              );
            }}
            className={nodeClassNames}
          ></div>
        );
      }
    case "wall":
      if (isMouseDown) {
        if (isStart || isFinish) {
          return <div className={nodeClassNames}></div>;
        } else {
          return (
            <div
              onMouseEnter={() => {
                dispatch(
                  saveGrid({
                    isWall: { isWall: true, col: col, row: row },
                  })
                );
              }}
              className={nodeClassNames}
            ></div>
          );
        }
      }
    default:
      return <div className={nodeClassNames}></div>;
  }
};

export default Node;
