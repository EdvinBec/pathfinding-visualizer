import { configureStore } from "@reduxjs/toolkit";
import startPosition from "./startPositionSlice";
import finishPosition from "./finishPositionSlice";

export const store = configureStore({
  reducer: {
    startPosition: startPosition,
    finishPosition: finishPosition,
  },
});
