import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grid: [[{}]],
  gridHeight: 20,
  gridWidth: 50,
  startPosition: { x: 5, y: 10 },
  finishPosition: { x: 45, y: 10 },
  previousStart: { x: 0, y: 0 },
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    saveGrid: (state: any, action) => {
      if (action.payload.grid) {
        state.grid = action.payload.grid;
      }
      if (action.payload.isWall) {
        state.grid[action.payload.isWall.row][
          action.payload.isWall.col
        ].isWall = action.payload.isWall.isWall;
      }
      if (action.payload.startPosition) {
        state.grid[action.payload.previousStart.y][
          action.payload.previousStart.x
        ].isStart = false;
        state.grid[action.payload.startPosition.y][
          action.payload.startPosition.x
        ].isStart = true;
        state.startPosition = action.payload.startPosition;
      }
      if (action.payload.finishPosition) {
        state.grid[action.payload.previousFinish.y][
          action.payload.previousFinish.x
        ].isFinish = false;
        state.grid[action.payload.finishPosition.y][
          action.payload.finishPosition.x
        ].isFinish = true;
        state.finishPosition = action.payload.finishPosition;
      }
    },
  },
});

export const { saveGrid } = gridSlice.actions;

export default gridSlice.reducer;
