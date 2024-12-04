import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { setDialog } from "../../features/DialogSlice";
import { Link, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  addTask,
  setDescription,
  setPriority,
  setTitle,
  TaskStatus,
} from "../../features/TaskSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { selectedProject } from "../../features/ProjectValueSlice";

const Navbar = () => {
  const { id } = useParams();

  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");
  const dispatch = useDispatch();
  const location = useLocation();

  const isOnProjectTaskPage = location.pathname.startsWith("/project");
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
        iD: id || Date.now().toString(),
        newID: Math.floor(Math.random() * 9000 + 1000),
      };
      console.log(newTask.newID, "newTask.iD");

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
    <>
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

      <div className="relative">
        {/* Navbar Header */}
        <div className="navbar-header cursor-pointer">
          <Link to={"/"} className="flex justify-center items-center gap-5">
            {/* <Menu className="h-6 w-6" onClick={toggleLeftSection} /> */}
            <h2 className="text-3xl font-bold">Project</h2>
          </Link>
          {!isOnProjectTaskPage ? (
            <div className="button-section">
              <button className="create-button flex items-center  text-white px-4 py-2 rounded-lg">
                <Plus className="plus-icon mr-2" />
                <span className="btn-text" onClick={handleToggle}>
                  Create Project
                </span>
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="btn bg-black-200 p-2 text-white rounded-lg"
              onClick={handleToggle}
            >
              Create Task
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
