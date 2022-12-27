import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NodeType } from "../interfaces";
import { saveFinishPosition } from "../redux/finishPositionSlice";
import { saveWalls } from "../redux/wallsSlice";
import { saveStartPosition } from "../redux/startPositionSlice";

type Props = {
  isStart: boolean;
  isFinish: boolean;
  col: number;
  row: number;
  isMouseDown?: boolean;
  currentAction: string;
  isWall: boolean;
};

const Node = ({
  isStart,
  isFinish,
  isWall,
  col,
  row,
  isMouseDown,
  currentAction,
}: Props) => {
  const [wall, setWall] = useState("");

  const dispatch = useDispatch();

  const extraClassName = isStart ? "nodeStart" : isFinish ? "nodeFinish" : "";

  const nodeClassNames = `node ${extraClassName} ${wall} ${
    "c" + col + "r" + row
  }`;

  switch (currentAction) {
    case "start":
      return (
        <div
          onClick={() => {
            dispatch(
              saveStartPosition({
                x: col,
                y: row,
              })
            );
          }}
          className={nodeClassNames}
        ></div>
      );
    case "finish":
      return (
        <div
          onClick={() => {
            dispatch(
              saveFinishPosition({
                x: col,
                y: row,
              })
            );
          }}
          className={nodeClassNames}
        ></div>
      );
    case "wall":
      if (isMouseDown) {
        return (
          <div
            onMouseEnter={() => {
              setWall("wall");
              dispatch(saveWalls({ row: row, col: col, status: true }));
            }}
            className={nodeClassNames}
          ></div>
        );
      }
    case "finish":
      return (
        <div
          onClick={() => {
            dispatch(
              saveFinishPosition({
                x: col,
                y: row,
              })
            );
          }}
          className={nodeClassNames}
        ></div>
      );
    default:
      return <div className={nodeClassNames}></div>;
  }
};

export default Node;
