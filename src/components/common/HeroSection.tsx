import React, { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "../../features/DialogSlice";
import {
  setAddProject,
  setCurrentDescription,
  setCurrentTitle,
  setProjects,
} from "../../features/ProjectValueSlice";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");
  const currentTitle = useSelector(
    (state: RootState) => state.ProjectValues.currentTitle
  );
  const currentDescription = useSelector(
    (state: RootState) => state.ProjectValues.currentDescription
  );

  const Dialog = useSelector((state: RootState) => state.dialog.value);
  const projects = useSelector(
    (state: RootState) => state.ProjectValues.projects
  );

  const handleClose = () => {
    dispatch(setDialog(false));
  };

  useEffect(() => {
    const storedProjects = localStorage.getItem("Projects");
    if (storedProjects) {
      const parsedprojects = JSON.parse(storedProjects);
      dispatch(setProjects(parsedprojects));
    }
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Project input
    e.preventDefault();

    let valid = true;
    if (currentTitle.trim().length === 0) {
      setErrorTitle("Title is required!");
      valid = false;
    } else {
      setErrorTitle("");
    }

    if (currentDescription.trim().length === 0) {
      setErrorDescription("Description is required!");
      valid = false;
    } else {
      setErrorDescription("");
    }

    if (valid) {
      const newProject = {
        title: currentTitle,
        description: currentDescription,
        id: Date.now().toString(),
      };

      dispatch(setAddProject(newProject));
      const updatedProjects = [...projects, newProject];
      localStorage.setItem("Projects", JSON.stringify(updatedProjects));
      dispatch(setCurrentTitle(""));
      dispatch(setCurrentDescription(""));
      dispatch(setDialog(false));
    }
  };

  const navigateProjectToTask = (projectId: string) => {
    const selectedProject = projects.find(
      (project) => project.id === projectId
    );

    if (selectedProject) {
      localStorage.setItem("selectedProject", JSON.stringify(selectedProject));

      navigate(`/project/${projectId}`);
    }
  };

  return (
    <div>
      {Dialog && (
        <div className="main-dialog-section">
          <div className="dialog-section">
            <button className="cross-icon" onClick={handleClose}>
              ✖
            </button>
            <h3 className="text-heading">Create New Project</h3>
            <form className="form-section" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="project-title"
                  className="block font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="project-title"
                  name="project-title"
                  type="text"
                  className="title-input"
                  placeholder="Enter project title"
                  value={currentTitle}
                  onChange={(e) => dispatch(setCurrentTitle(e.target.value))}
                />
                {errorTitle && (
                  <span className="text-red-500">{errorTitle}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="project-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="project-description"
                  name="project-description"
                  rows={3}
                  className="title-description"
                  placeholder="Enter project description"
                  value={currentDescription}
                  onChange={(e) =>
                    dispatch(setCurrentDescription(e.target.value))
                  }
                ></textarea>
                {errorDescription && (
                  <span className="text-red-500">{errorDescription}</span>
                )}
              </div>
              <button type="submit" className="btn">
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Projects */}
      {projects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5 px-5">
          {projects.map((eachProject, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg transform transition-all hover:shadow-2xl duration-300"
            >
              <div className="max-h-40 overflow-y-auto p-6 capitalize">
                <h1 className="text-xl font-semibold text-gray-800 mb-4">
                  {eachProject.title}
                </h1>
                <div className="text-gray-600 text-sm overflow-hidden break-words">
                  <p>{eachProject.description}</p>
                </div>
              </div>
              <div className="px-6 pb-6 flex justify-end">
                <button
                  className="bg-black-200 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black-50 transition-colors duration-200 my-5"
                  onClick={() => navigateProjectToTask(eachProject.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeroSection;
