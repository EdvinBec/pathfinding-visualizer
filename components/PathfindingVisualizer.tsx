import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dijkstra } from "../algorithms/dijkstra";
import { NodeType } from "../interfaces";
import Grid from "./Grid";

type Props = {};

//Animation speed
const SEARCH_ANIMATION_SPEED = 10;
const PATH_ANIMATION_SPEED = 50;

const PathfindingVisualizer = (props: Props) => {
  const [currentAction, setCurrentAction] = useState("");
  const [grid, setGrid] = useState<Array<Array<NodeType>>>();

  const getGrid = (grid: Array<Array<NodeType>>) => {
    //Get grid from GRID component
    setGrid(grid);
  };

  const notifyNoPath = () => {
    toast.error(`There is no possible path`, {
      position: "bottom-left",
    });
  };

  return (
    <div className="appContainer">
      <div className="navigationBar">
        <button className="algorithmOptions">Dijkstra</button>
        <button
          className="visualizeButton"
          onClick={() => {
            if (grid) {
              const { visitedNodesInOrder, shortestPath, errorMsg } =
                dijkstra(grid);
              animateDijkstra(visitedNodesInOrder, shortestPath);
              if (errorMsg) {
                notifyNoPath();
              }
            }
          }}
        >
          Visualize
        </button>
        <button className="algorithmOptions">A*</button>
      </div>
      <div className="buttonContainer">
        <h4>
          These buttons allow you to place walls and modify the positions of
          nodes
        </h4>
        <div className="buttons">
          <button
            className="startButton"
            onClick={() => setCurrentAction("start")}
          >
            Start
          </button>
          <button
            className="finishButton"
            onClick={() => setCurrentAction("finish")}
          >
            Finish
          </button>
          <button
            className="wallButton"
            onClick={() => setCurrentAction("wall")}
          >
            Wall
          </button>
        </div>
      </div>
      <div className="gridContainer">
        <h4>
          Select an algorithm from the options provided and visualize it through
          our visualization tool
        </h4>
        <Grid currentAction={currentAction} getGrid={getGrid} />
      </div>

      <ToastContainer theme="light" />
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
