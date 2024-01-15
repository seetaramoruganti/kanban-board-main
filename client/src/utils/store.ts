import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import laneReducer from "./reducers/laneReducer";
import taskReducer from "./reducers/taskReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    users: userReducer,
    lanes: laneReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
