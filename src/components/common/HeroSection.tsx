import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AddTaskModal from "./AddTaskModal";
import Navbar from "./Navbar";
import { Link } from "react-router";

const HeroSection = () => {
  const projects = useSelector(
    (state: RootState) => state.ProjectValues.projects
  );

  return (
    <div>
      <Navbar title="projects">
        <AddTaskModal isProject={true} />
      </Navbar>

      {/* Projects */}
      {projects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5 px-5 max-w-[1200px]">
          {projects.map((eachProject, index) => (
            <Link
              to={`/project/${eachProject.id}`}
              key={index}
              className="bg-white shadow-lg rounded-lg transform transition-all hover:shadow-2xl duration-300 cursor-pointer"
            >
              <div className="max-h-[200px] overflow-y-auto p-6 capitalize">
                <h1 className="text-xl font-semibold text-gray-800 mb-4">
                  {eachProject.title}
                </h1>
                <div className="text-gray-600 text-sm overflow-hidden break-words">
                  <p>{eachProject.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeroSection;
