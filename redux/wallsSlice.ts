import { createSlice } from "@reduxjs/toolkit";

const initialWalls = () => {
  const grid: Array<any> = [];
  for (let i = 0; i < 20; i++) {
    const row = [];
    for (let j = 0; j < 50; j++) {
      row.push({ isWall: false });
    }
    grid.push(row);
  }

  return grid;
};

const initialState = {
  walls: initialWalls(),
};

export const walls = createSlice({
  name: "walls",
  initialState,
  reducers: {
    saveWalls: (state: any, action) => {
      state.walls[action.payload.row][action.payload.col].isWall =
        action.payload.status;
    },
  },
});

export const { saveWalls } = walls.actions;

export default walls.reducer;
