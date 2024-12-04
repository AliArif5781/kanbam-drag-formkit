import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
now i want the drag and drop feature in this code user can only drag the filteredTask and move ony in draft , inprogress and done section also add re-order system if we have one task in draft and one in done if we want drag task from draft to done they set in order
 */
// Define Task status type
export type TaskStatus = "Normal" | "Medium" | "High";

// Define Task object interface
interface Task {
  title: string;
  description: string;
  priority: TaskStatus;
  iD: string;
  newID: number;
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
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.newID !== action.payload);
      if (action.payload) {
        localStorage.setItem("task", JSON.stringify(state.tasks));
      }
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
  deleteTask,
} = TaskSlice.actions;

export default TaskSlice.reducer;
