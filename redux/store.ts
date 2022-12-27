import { configureStore } from "@reduxjs/toolkit";
import startPosition from "./startPositionSlice";
import finishPosition from "./finishPositionSlice";
import walls from "./wallsSlice";

export const store = configureStore({
  reducer: {
    startPosition: startPosition,
    finishPosition: finishPosition,
    walls: walls,
  },
});
