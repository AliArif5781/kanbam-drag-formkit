import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../store/store";
import { setTasks, TaskStatus } from "../../store/TaskSlice";
import AddTaskModal from "./AddTaskModal";
import Navbar from "./Navbar";
import TasksGroup from "./TasksGroup";

const ProjectTask = () => {
  const { id }: { id: number } = useParams() as any;
  console.log(id);
  const dispatch = useDispatch();
  const project = useMemo(() => {
    const projects = JSON.parse(localStorage.getItem("Projects") as any) || [];
    return projects.find((project: any) => project.id === id);
  }, []);

  const tasks = useSelector((state: RootState) => state.task.tasks);
  console.log(tasks);

  const filteredTask = useMemo(() => {
    return tasks.filter((task) => task.projectId === id);
  }, [tasks]);

  const DraftTask = useMemo(() => {
    return filteredTask.filter((task) => task.status === "draft");
  }, [filteredTask]);

  const inProgressTask = useMemo(() => {
    return filteredTask.filter((task) => task.status === "inProgress");
  }, [filteredTask]);

  const doneTask = useMemo(() => {
    return filteredTask.filter((task) => task.status === "done");
  }, [filteredTask]);

  const onDragEnd = (id: string, status: TaskStatus) => {
    const newTasks = [...tasks].map((task) => {
      if (task.id == id) {
        return {
          ...task,
          status,
        };
      }
      return task;
    });
    localStorage.setItem("task", JSON.stringify(newTasks));
    dispatch(setTasks(newTasks));
  };
  return (
    <div>
      <Navbar
        title={`projectTasks: ${project?.title}

`}
      >
        <AddTaskModal isProject={false} />
      </Navbar>
      <div>
        <div className="pt-4 sm:pt-5 md:pt-6">
          <div>
            {project && (
              <div className="px-5" key={project.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full">
                  <TasksGroup
                    key={DraftTask.length}
                    tasks={DraftTask}
                    title="Draft"
                    status="draft"
                    onDragEnd={onDragEnd}
                  />
                  <TasksGroup
                    key={inProgressTask.length}
                    tasks={inProgressTask}
                    title="inProgress"
                    status="inProgress"
                    onDragEnd={onDragEnd}
                  />
                  <TasksGroup
                    key={doneTask.length}
                    tasks={doneTask}
                    title="done"
                    status="done"
                    onDragEnd={onDragEnd}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTask;
