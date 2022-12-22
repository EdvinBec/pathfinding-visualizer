import React, { useState } from "react";
import { NodeType } from "../interfaces";

type Props = {
  isStart: boolean;
  isFinish: boolean;
  col: number;
  row: number;
  node: NodeType;
  isMouseDown?: boolean;
};

const Node = ({ isStart, isFinish, col, row, node, isMouseDown }: Props) => {
  const [wall, setWall] = useState<String>();

  const extraClassName = isStart ? "nodeStart" : isFinish ? "nodeFinish" : "";

  const nodeClassNames = `node ${extraClassName} ${wall} ${
    "c" + col + "r" + row
  }`;
  return (
    <>
      {!isMouseDown && <div className={nodeClassNames}></div>}
      {isMouseDown && (
        <div
          onMouseEnter={() => {
            setWall("wall");
            node.isWall = true;
          }}
          className={nodeClassNames}
        ></div>
      )}
    </>
  );
};

export default Node;
