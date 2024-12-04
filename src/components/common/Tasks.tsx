import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteTask } from "../../features/TaskSlice";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
const Tasks = ({ title, description, priority, newID }: any) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id: newID });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: active ? "grabbing" : "grab",
  };

  const handleDelete = (newID: any) => {
    dispatch(deleteTask(newID));
  };

  return (
    <div
      className="border bg-white rounded mt-2 p-2 cursor-grab"
      key={newID}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div style={{ touchAction: "none" }}>
        <div className="capitalize">{title}</div>
        <div className="text-gray-500 text sm max-w-lg break-words py-1 capitalize">
          {description}
        </div>
        <div className="flex justify-between px-2">
          <div
            className={`px-3  rounded flex justify-center items-center ${
              priority === "Normal"
                ? "bg-[#6d7990] text-white"
                : priority === "Medium"
                ? "bg-[#A3C8F6] text-white-150"
                : priority === "High"
                ? "bg-red-500 text-white"
                : ""
            }`}
          >
            {priority}
          </div>
          <div>
            <button
              className=" hover:text-red-700"
              onClick={() => handleDelete(newID)}
            >
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
