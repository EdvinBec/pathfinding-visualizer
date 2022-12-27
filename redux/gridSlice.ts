import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grid: null,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    saveGrid: (state: any, action) => {
      state.grid = action.payload.grid;
    },
  },
});

export const { saveGrid } = gridSlice.actions;

export default gridSlice.reducer;
