import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetApp: () => initialState,
  },
});

export const { resetApp } = appSlice.actions;
export default appSlice.reducer;