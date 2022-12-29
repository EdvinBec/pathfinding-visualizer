import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dijkstra } from "../algorithms/dijkstra";
import { NodeType } from "../interfaces";
import { saveGrid } from "../redux/gridSlice";
import Grid from "./Grid";

type Props = {};

//Animation speed
const SEARCH_ANIMATION_SPEED = 10;
const PATH_ANIMATION_SPEED = 50;

const PathfindingVisualizer = (props: Props) => {
  const grid = useSelector((state: any) => state.grid.grid);
  const startNode = useSelector((state: any) => state.grid.startPosition);
  const finishNode = useSelector((state: any) => state.grid.finishPosition);

  const dispatch = useDispatch();

  const [currentAction, setCurrentAction] = useState("");
  const [newGrid, setNewGrid] = useState(false);

  const notify = (message: string) => {
    toast.error(message, {
      position: "bottom-left",
    });
  };

  return (
    <div className="appContainer">
      <div className="navigationBar">
        <h1 className="logo">Pathfinding visualizer</h1>
        <div className="centerButtons">
          <button className="algorithmOptions">Dijkstra</button>
          <button
            className="visualizeButton"
            onClick={() => {
              const clone = JSON.parse(JSON.stringify(grid)); //Create editable copy of grid

              const response = dijkstra(clone);
              const { visitedNodesInOrder, shortestPath, errorMsg } = response;

              if (errorMsg) {
                notify(errorMsg);
              }

              animateDijkstra(visitedNodesInOrder, shortestPath);
            }}
          >
            Visualize
          </button>
          <button className="algorithmOptions">A*</button>
        </div>
        <button
          className="clearButton"
          onClick={() => {
            if (newGrid === false) {
              dispatch(
                saveGrid({
                  previousStart: { x: startNode.x, y: startNode.y },
                  startPosition: { x: 5, y: 10 },
                  previousFinish: { x: finishNode.x, y: finishNode.y },
                  finishPosition: { x: 45, y: 10 },
                })
              );
              clearGrid(grid);
              setNewGrid(true);
            } else {
              dispatch(
                saveGrid({
                  previousStart: { x: startNode.x, y: startNode.y },
                  startPosition: { x: 5, y: 10 },
                  previousFinish: { x: finishNode.x, y: finishNode.y },
                  finishPosition: { x: 45, y: 10 },
                })
              );
              clearGrid(grid);
              setNewGrid(false);
            }
          }}
        >
          Clear grid
        </button>
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
        <Grid currentAction={currentAction} notify={notify} newGrid={newGrid} />
      </div>

      <ToastContainer theme="light" />
    </div>
  );
};

const clearGrid = (grid: Array<Array<NodeType>>) => {
  for (const row of grid) {
    for (const node of row) {
      const nodeDiv = document.querySelector(
        `.${"c" + node.col + "r" + node.row}`
      );
      nodeDiv?.classList.remove("searching");
      nodeDiv?.classList.remove("isVisited");
    }
  }
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
