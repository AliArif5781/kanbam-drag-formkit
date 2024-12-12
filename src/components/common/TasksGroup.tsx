import { Task, TaskStatus } from "../../store/TaskSlice";
import Tasks from "./Tasks";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

interface TasksGroupProps {
  tasks: Task[];
  title: string;
  status: TaskStatus;
  onDragEnd: (id: string, status: TaskStatus) => void;
}
const TasksGroup = ({ tasks, title, status, onDragEnd }: TasksGroupProps) => {
  const [parent1, data, setData] = useDragAndDrop<any, Task>(tasks, {
    group: "task",

    multiDrag: true,
    onDragend(data) {
      const status = data.draggedNode.el.dataset.status as TaskStatus;
      const id = data.draggedNode.el.id;
      onDragEnd(id, status);
    },

    selectedClass: "bg-blue-500 text-white",
  });
  return (
    <div className="bg-[#F3F4F6] rounded-lg shadow-md gap-6">
      <span className="text-sm sm:text-base p-3 sm:p-4 text-gray-800 font-medium flex flex-col">
        {title}
        <div ref={parent1} className="min-h-[400px]">
          {data.length > 0
            ? data.map((task) => (
                <Tasks key={task.id} {...task} status={status} />
              ))
            : ""}
        </div>
      </span>
    </div>
  );
};

export default TasksGroup;
