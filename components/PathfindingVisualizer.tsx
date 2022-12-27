import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dijkstra } from "../algorithms/dijkstra";
import { NodeType } from "../interfaces";
import Grid from "./Grid";

type Props = {};

//Animation speed
const SEARCH_ANIMATION_SPEED = 10;
const PATH_ANIMATION_SPEED = 50;

const PathfindingVisualizer = (props: Props) => {
  const grid = useSelector((state: any) => state.grid.grid);

  const [noPathMessage, setNoPathMessage] = useState(""); //If no possible path message
  const [currentAction, setCurrentAction] = useState("");

  /* Generate initial grid on load
    and save it in local state
  */

  return (
    <div>
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

      <Grid currentAction={currentAction} />

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

export default PathfindingVisualizer;
