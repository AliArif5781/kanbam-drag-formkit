import { configureStore } from "@reduxjs/toolkit";
import DialogReducer from "../features/DialogSlice";
import ProjectValueReducer from "../features/ProjectValueSlice";
import TaskReducer from "../features/TaskSlice";

export const store = configureStore({
  reducer: {
    dialog: DialogReducer,
    ProjectValues: ProjectValueReducer,
    task: TaskReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
