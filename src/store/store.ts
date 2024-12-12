import { configureStore } from "@reduxjs/toolkit";
import ProjectValueReducer from "./ProjectValueSlice";
import TaskReducer from "./TaskSlice";

export const store = configureStore({
  reducer: {
    ProjectValues: ProjectValueReducer,
    task: TaskReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
