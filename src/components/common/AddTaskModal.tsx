import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addTask, Task } from "../../store/TaskSlice";
import { setAddProject } from "../../store/ProjectValueSlice";

interface AddTaskModelProps {
  isProject: boolean;
}
const AddTaskModal = ({ isProject }: AddTaskModelProps) => {
  const { id } = useParams();
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isModelOpen, setIsModelOpen] = useState(false);

  const dispatch = useDispatch();

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    if (!values.title || !values.description) {
      valid = false;
      setErrors({
        ...errors,
        title: !values.title ? "Title is Required" : "",
        description: !values.description ? "Description is Required" : "",
      });
    }
    if (valid) {
      if (isProject) {
        const newProject = {
          title: values.title,
          description: values.description,
          id: Date.now().toString(),
        };
        dispatch(setAddProject(newProject));
        const projects =
          JSON.parse(localStorage.getItem("Projects") as any) || [];
        const updatedProject = [...projects, newProject];

        localStorage.setItem("Projects", JSON.stringify(updatedProject));
      } else {
        const newTask: Task = {
          title: values.title,
          description: values.description,
          priority: values.priority,
          projectId: id || Date.now().toString(),
          id: Math.floor(Math.random() * 9000 + 1000),
          status: "draft",
        };

        dispatch(addTask(newTask));
        const tasks = JSON.parse(localStorage.getItem("task") as any) || [];
        const updatedTasks = [...tasks, newTask];

        localStorage.setItem("task", JSON.stringify(updatedTasks));
      }
      setIsModelOpen(false);
    }
  };

  const handleValue = (key: string, value: string) => {
    setValues({
      ...values,
      [key]: value,
    });
  };
  return (
    <div>
      <button onClick={() => setIsModelOpen(true)}>
        {isProject ? "Add Project" : "Add Task"}
      </button>
      {isModelOpen && (
        <div className="main-dialog-section">
          <div className="dialog-section">
            <button
              className="cross-icon"
              onClick={() => setIsModelOpen(false)}
            >
              ✖
            </button>
            <h3 className="text-heading">
              {isProject ? "Create Project" : "Create Task"}
            </h3>
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
                  value={values.title}
                  onChange={(e) => handleValue("title", e.target.value)}
                />
                {errors.title && (
                  <span className="text-red-500">{errors.title}</span>
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
                  value={values.description}
                  onChange={(e) => handleValue("description", e.target.value)}
                ></textarea>
                {errors.description && (
                  <span className="text-red-500">{errors.description}</span>
                )}
              </div>
              {/* Priority Dropdown */}
              {!isProject && (
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
                    value={values.priority}
                    onChange={(e) => handleValue("description", e.target.value)}
                  >
                    <option value="Normal">Normal</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              )}
              <button type="submit" className="btn">
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskModal;
