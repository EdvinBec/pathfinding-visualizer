import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NodeType } from "../interfaces";
import { saveFinishPosition } from "../redux/finishPositionSlice";
import { saveStartPosition } from "../redux/startPositionSlice";

type Props = {
  isStart: boolean;
  isFinish: boolean;
  col: number;
  row: number;
  node: NodeType;
  isMouseDown?: boolean;
  currentAction: string;
};

const Node = ({
  isStart,
  isFinish,
  col,
  row,
  node,
  isMouseDown,
  currentAction,
}: Props) => {
  const dispatch = useDispatch();

  const [wall, setWall] = useState<String>();

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
              node.isWall = true;
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
