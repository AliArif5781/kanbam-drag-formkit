import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
now i want the drag and drop feature in this code user can only drag the filteredTask and move ony in draft , inprogress and done section also add re-order system if we have one task in draft and one in done if we want drag task from draft to done they set in order
 */
// Define Task status type
export type TaskStatus = "draft" | "inProgress" | "done";
export type PriorityStatus = "Normal" | "Medium" | "High";

// Define Task object interface
export interface Task {
  title: string;
  description: string;
  priority: PriorityStatus;
  id: any; // task id
  projectId: any; // project id
  status: TaskStatus; // project id
}

interface TaskState {
  tasks: Task[];
}

function getTaskFromLs() {
  const tasks: string = localStorage.getItem("task") as any;
  return JSON.parse(tasks) || [];
}
const initialState: TaskState = {
  tasks: getTaskFromLs(), // Array to store tasks
};

export const TaskSlice = createSlice({
  name: "task-value",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      if (action.payload) {
        localStorage.setItem("task", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, deleteTask, setTasks } = TaskSlice.actions;

export default TaskSlice.reducer;
