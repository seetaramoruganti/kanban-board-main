import { createSlice } from "@reduxjs/toolkit";
import Lane from "../../types/laneTypes";

const initialState: Lane[] = [];

const laneReducer = createSlice({
  name: "lane",
  initialState,
  reducers: {
    initialiseLanes(state, action) {
      return action.payload;
    },
    addLanes(state, action) {
      console.log(action);
      return [...state, action.payload];
    },
  },
});
export const { addLanes, initialiseLanes } = laneReducer.actions;

export default laneReducer.reducer;
