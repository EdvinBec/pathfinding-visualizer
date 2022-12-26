import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  x: 5,
  y: 10,
};

export const startPositionSlice = createSlice({
  name: "startPosition",
  initialState,
  reducers: {
    saveStartPosition: (state: any, action) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const { saveStartPosition } = startPositionSlice.actions;

export default startPositionSlice.reducer;
