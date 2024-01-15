import { createSlice } from "@reduxjs/toolkit";
import User from "../../types/userTypes";

const initialState: User[] = [];

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialiseUsers(state, action) {
      return action.payload;
    },
    addUsers(state, action) {
      console.log(action);
      return [...state, action.payload];
    },
  },
});
export const { addUsers, initialiseUsers } = userReducer.actions;

export default userReducer.reducer;
