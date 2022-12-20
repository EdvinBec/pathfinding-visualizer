import React from "react";
import { NodeType } from "../interfaces";

type Props = {};

const Node = ({ isStart, isFinish, col, row }: NodeType) => {
  const extraClassName = isStart ? "nodeStart" : isFinish ? "nodeFinish" : "";
  return <div className={`node ${extraClassName}`}></div>;
};

export default Node;
