import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Task status type
export type TaskStatus = "Normal" | "Medium" | "High";

// Define Task object interface
interface Task {
  title: string;
  description: string;
  priority: TaskStatus;
}

interface TaskState {
  tasks: Task[];
  title: string;
  description: string;
  priority: TaskStatus;
}

const initialState: TaskState = {
  tasks: [], // Array to store tasks
  title: "",
  description: "",
  priority: "Normal",
};

export const TaskSlice = createSlice({
  name: "task-value",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setPriority: (state, action: PayloadAction<TaskStatus>) => {
      state.priority = action.payload;
    },
    setTasksFromLocalStorage: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    // On app load, load tasks from localStorage if available
    builder.addDefaultCase((state) => {
      const storedTasks = localStorage.getItem("task");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        state.tasks = parsedTasks;
      }
    });
  },
});

export const {
  setTitle,
  setDescription,
  setPriority,
  addTask,
  setTasksFromLocalStorage,
} = TaskSlice.actions;

export default TaskSlice.reducer;
