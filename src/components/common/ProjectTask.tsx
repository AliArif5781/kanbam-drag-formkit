import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setTasksFromLocalStorage } from "../../features/TaskSlice";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import Tasks from "./Tasks";

const ProjectTask = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const project = useSelector(
    (state: RootState) => state.ProjectValues.selectedProject
  );
  const text = useSelector((state: RootState) => state.dialog.value);
  const tasks = useSelector((state: RootState) => state.task.tasks);
  // console.log(tasks, "wholeDAta");

  // const handleToggle = () => {
  //   dispatch(setDialog(true));
  // };

  const filteredTask = tasks.filter((task) => task.iD === id);

  const getPosition = (id: any) => {
    const tk = tasks.map((task) => task);
    const position = tk.findIndex((task) => task.newID === id);
    return position !== -1 ? position : -1;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const originalPosition = getPosition(active?.id);
    const latestPosition = getPosition(over?.id);

    if (
      originalPosition === -1 ||
      latestPosition === -1 ||
      originalPosition === latestPosition
    ) {
      return;
    }

    const reorderedTasks = arrayMove(tasks, originalPosition, latestPosition);

    dispatch(setTasksFromLocalStorage(reorderedTasks));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );
  return (
    <div>
      <div>
        <div className="pt-4 sm:pt-5 md:pt-6">
          <div className={`${text ? "blur-sm" : ""}`}>
            {project && (
              <div className="px-5" key={project.id}>
                <h3 className="block text-xl font-semibold  ">
                  Project:{" "}
                  <span className="text-gray-700">{project.title}</span>{" "}
                </h3>{" "}
                {/* <button
                  className=" bg-black-200 text-white p-2 my-2 hover:shadow-lg transition-all duration-300 ease-in-out rounded-lg"
                  onClick={handleToggle}
                >
                  Create Task
                </button> */}
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={handleDragEnd}
                  sensors={sensors}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full">
                    {/* Draft */}

                    <SortableContext
                      items={tasks.map((item) => item.newID)}
                      strategy={rectSwappingStrategy}
                    >
                      <div className="bg-[#F3F4F6] p-3 sm:p-4 rounded-lg shadow-md gap-6">
                        <span className="text-sm sm:text-base text-gray-800 font-medium flex flex-col">
                          Draft
                          {filteredTask.length > 0
                            ? tasks.map((task) => (
                                <Tasks key={task.newID} {...task} />
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
                    </SortableContext>
                  </div>
                </DndContext>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTask;
