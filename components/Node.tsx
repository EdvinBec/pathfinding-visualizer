import React from "react";

type Props = {
  isStart: boolean;
  isFinish: boolean;
  col: number;
  row: number;
};

const Node = ({ isStart, isFinish, col, row }: Props) => {
  const extraClassName = isStart ? "nodeStart" : isFinish ? "nodeFinish" : "";
  return (
    <div className={`node ${extraClassName} ${"s" + col + "s" + row}`}></div>
  );
};

export default Node;
