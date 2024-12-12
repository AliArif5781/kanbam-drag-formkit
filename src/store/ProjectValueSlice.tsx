import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  id: string;
  title: string;
  description: string;
}

interface ProjectValue {
  currentTitle: string;
  currentDescription: string;
  projects: Project[];
  selectedProject: Project | null;
}
const initialState: ProjectValue = {
  currentTitle: "",
  currentDescription: "",
  projects: [],
  selectedProject: null,
};

export const ProjectSlice = createSlice({
  name: "project-input-value",
  initialState,
  reducers: {
    setCurrentTitle: (state, action: PayloadAction<string>) => {
      state.currentTitle = action.payload;
    },
    setCurrentDescription: (state, action: PayloadAction<string>) => {
      state.currentDescription = action.payload;
    },
    // Add a new project to the projects array in Redux state
    setAddProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    // Set the whole list of projects (used for initializing from localStorage)
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    selectedProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
    },
  },
});

export const {
  setCurrentTitle,
  setCurrentDescription,
  setAddProject,
  setProjects,
  selectedProject,
} = ProjectSlice.actions;
export default ProjectSlice.reducer;
/*
now i want the drag and drop feature in this code user can only drag the filteredTask and move ony in draft , inprogress and done section also add re-order system if we have one task in draft and one in done if we want drag task from draft to done they set in order
 */
