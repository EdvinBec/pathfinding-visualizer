import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: {
    x: 5,
    y: 10,
  },
  finish: {
    x: 45,
    y: 10,
  },
};

export const startFinishPositionSlice = createSlice({
  name: "startFinishPosition",
  initialState,
  reducers: {
    saveStartPosition: (state: any, action) => {
      state.start = action.payload.start;
      state.finish = action.payload.finish;
    },
  },
});

export const { saveStartPosition } = startFinishPositionSlice.actions;

export default startFinishPositionSlice.reducer;
