import { configureStore } from "@reduxjs/toolkit";
import grid from "./gridSlice";

export const store = configureStore({
  reducer: {
    grid: grid,
  },
});
