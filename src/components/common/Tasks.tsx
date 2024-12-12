import { deleteTask } from "../../store/TaskSlice";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
const Tasks = ({ title, description, priority, id, status }: any) => {
  const dispatch = useDispatch();

  const handleDelete = (newID: any) => {
    dispatch(deleteTask(newID));
  };

  return (
    <div
      id={id}
      data-status={status}
      className=" border bg-white rounded mt-2 p-2 cursor-grab"
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
              onClick={() => handleDelete(id)}
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
