import { configureStore } from "@reduxjs/toolkit";
import startFinishReducer from "./startFinishPositionSlice";

export const store = configureStore({
  reducer: {
    startFinish: startFinishReducer,
  },
});
