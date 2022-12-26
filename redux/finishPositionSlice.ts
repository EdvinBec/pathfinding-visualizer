import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  x: 45,
  y: 10,
};

export const finishPositionSlice = createSlice({
  name: "finishPosition",
  initialState,
  reducers: {
    saveFinishPosition: (state: any, action) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const { saveFinishPosition } = finishPositionSlice.actions;

export default finishPositionSlice.reducer;
