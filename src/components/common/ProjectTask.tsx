import { useParams } from "react-router";
import { MotionConfig, motion, useDragControls } from "motion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedProject } from "../../features/ProjectValueSlice";
import { RootState } from "../../app/store";
import { setDialog } from "../../features/DialogSlice";
import {
  addTask,
  setDescription,
  setPriority,
  setTitle,
  TaskStatus,
} from "../../features/TaskSlice";

const ProjectTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const controls = useDragControls();

  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");

  const project = useSelector(
    (state: RootState) => state.ProjectValues.selectedProject
  );
  const text = useSelector((state: RootState) => state.dialog.value);

  const taskTitleValue = useSelector((state: RootState) => state.task.title);
  const taskDescriptionValue = useSelector(
    (state: RootState) => state.task.description
  );
  const priorityValue = useSelector((state: RootState) => state.task.priority);
  const tasks = useSelector((state: RootState) => state.task.tasks);

  useEffect(() => {
    const storedProjects = localStorage.getItem("selectedProject");
    if (storedProjects) {
      const parsedProject = JSON.parse(storedProjects);
      if (parsedProject.id === id) {
        dispatch(selectedProject(parsedProject));
      }
    }
  }, [id, dispatch]);

  const handleToggle = () => {
    dispatch(setDialog(true));
  };

  const handleClose = () => {
    dispatch(setDialog(false));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPriority(e.target.value as TaskStatus));
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    if (taskTitleValue.trim().length === 0) {
      setErrorTitle("Title is required!");
      valid = false;
    } else {
      setErrorTitle("");
    }

    if (taskDescriptionValue.trim().length === 0) {
      setErrorDescription("Description is required!");
      valid = false;
    } else {
      setErrorDescription("");
    }

    if (valid) {
      const newTask = {
        title: taskTitleValue,
        description: taskDescriptionValue,
        priority: priorityValue,
      };

      dispatch(addTask(newTask));
      const updatedTasks = [...tasks, newTask];

      localStorage.setItem("task", JSON.stringify(updatedTasks));

      dispatch(setDialog(false));
      dispatch(setTitle(""));
      dispatch(setDescription(""));
      dispatch(setPriority("Normal"));
    }
  };

  return (
    <div>
      {text && (
        <div className="main-dialog-section">
          <div className="dialog-section">
            <button className="cross-icon" onClick={handleClose}>
              ✖
            </button>
            <h3 className="text-heading">Create Project Task</h3>
            <form className="form-section" onSubmit={handleTextSubmit}>
              <div>
                <label
                  htmlFor="projectTask-title"
                  className="block font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="projectTask-title"
                  name="projectTask-title"
                  type="text"
                  className="title-input"
                  placeholder="Enter projectTask title"
                  value={taskTitleValue}
                  onChange={(e) => dispatch(setTitle(e.target.value))}
                />
                {errorTitle && (
                  <span className="text-red-500">{errorTitle}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="projectTask-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="projectTask-description"
                  name="projectTask-description"
                  rows={3}
                  className="title-description"
                  placeholder="Enter projectTask description"
                  value={taskDescriptionValue}
                  onChange={(e) => dispatch(setDescription(e.target.value))}
                ></textarea>
                {errorDescription && (
                  <span className="text-red-500">{errorDescription}</span>
                )}
              </div>
              {/* Priority Dropdown */}
              <div>
                <label
                  htmlFor="projectTask-priority"
                  className="block font-medium text-gray-700"
                >
                  Priority
                </label>
                <select
                  id="projectTask-priority"
                  name="projectTask-priority"
                  className="py-[13px] px-5 text-sm text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
                  value={priorityValue}
                  onChange={handlePriorityChange}
                >
                  <option value="Normal">Normal</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <button type="submit" className="btn">
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}
      <MotionConfig transition={{ duration: 1 }}>
        <motion.div
          className="pt-4 sm:pt-5 md:pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={`${text ? "blur-sm" : ""}`}>
            {project && (
              <div className="px-5" key={project.id}>
                <h3 className="block text-xl font-semibold  ">
                  Project:{" "}
                  <span className="text-gray-700">{project.title}</span>{" "}
                </h3>{" "}
                <button
                  className=" bg-black-200 text-white p-2 my-2 hover:shadow-lg transition-all duration-300 ease-in-out rounded-lg"
                  onClick={handleToggle}
                >
                  Create Task
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full">
                  {/* Draft */}
                  <div className="bg-[#F3F4F6] p-3 sm:p-4 rounded-lg shadow-md gap-6">
                    <span className="text-sm sm:text-base text-gray-800 font-medium flex flex-col">
                      Draft
                      {tasks.length > 0
                        ? tasks.map((task, index) => (
                            <motion.div
                              drag
                              dragControls={controls}
                              key={index}
                              className="border bg-white  rounded mt-2 p-2"
                            >
                              <div className="capitalize">{task.title}</div>
                              <div className="text-gray-500 text sm max-w-lg break-words py-1 capitalize">
                                {task.description}
                              </div>
                              <span
                                className={`px-2 py-1 rounded space-y-5
                                ${
                                  task.priority === "Normal"
                                    ? "bg-[#6d7990] text-white"
                                    : task.priority === "Medium"
                                    ? "bg-[#A3C8F6] text-white-150"
                                    : task.priority === "High"
                                    ? "bg-red-500 text-white"
                                    : ""
                                }
                                `}
                              >
                                {task.priority}
                              </span>
                            </motion.div>
                          ))
                        : ""}
                    </span>
                  </div>
                  {/* In-progress */}
                  <div className="bg-[#F3F4F6] p-3 sm:p-4 rounded-lg shadow-md gap-6">
                    <span className="text-sm sm:text-base text-gray-800 font-medium flex flex-col">
                      In-progress
                    </span>
                  </div>
                  {/* Done */}
                  <div className="bg-[#F3F4F6] p-3 sm:p-4 rounded-lg shadow-md gap-6">
                    <span className="text-sm sm:text-base text-gray-800 font-medium flex flex-col">
                      Done
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
};

export default ProjectTask;
