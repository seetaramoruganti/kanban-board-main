import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
const initialState = {
  id: Number(localStorage.getItem("user_id")),
  email: "",
  name: "",
  avatarSrc: "",
  blobURL: "",
  token: localStorage.getItem("access_token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { id } = jwtDecode<{ id: number }>(action.payload.token);
      console.log(id);
      localStorage.setItem("user_id", id.toString());
      localStorage.setItem("access_token", action.payload.token);
      return { ...state, id, ...action.payload };
    },
    initialiseAuthUser(state, action) {
      return { ...state, ...action.payload };
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
      return {
        id: 0,
        email: "",
        name: "",
        avatarSrc: "",
        blobURL: "",
        token: "",
      };
    },
  },
});

export const { login, logout, initialiseAuthUser } = authSlice.actions;

export default authSlice.reducer;
