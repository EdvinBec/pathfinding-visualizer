import React, { useState } from "react";
import { nodeModuleNameResolver } from "typescript";
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
  const extraClassName = isStart ? "nodeStart" : isFinish ? "nodeFinish" : "";
  const [bg, setBg] = useState<String>();
  return (
    <>
      {isMouseDown && (
        <div
          onMouseEnter={() => {
            setBg("wall");
            node.isWall = true;
          }}
          className={`node ${extraClassName} ${bg} ${"s" + col + "s" + row}`}
        ></div>
      )}
      {!isMouseDown && (
        <div
          className={`node ${extraClassName} ${bg} ${"s" + col + "s" + row}`}
        ></div>
      )}
    </>
  );
};

export default Node;
