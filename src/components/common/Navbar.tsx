import { Menu, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDialog } from "../../features/DialogSlice";
import { Link } from "react-router";
const Navbar = () => {
  const dispatch = useDispatch();

  const [isLeftSectionVisible, setIsLeftSectionVisible] =
    useState<boolean>(false);

  const toggleLeftSection = () => {
    setIsLeftSectionVisible(!isLeftSectionVisible);
  };

  const handleToggle = () => {
    dispatch(setDialog(true));
  };

  return (
    <>
      <div className="relative">
        {/* Navbar Header */}
        <div className="navbar-header cursor-pointer">
          <Link to={"/"} className="flex justify-center items-center gap-5">
            <Menu className="h-6 w-6" onClick={toggleLeftSection} />
            <h2 className="text-3xl font-bold hidden sm:flex">Project</h2>
          </Link>
          <div className="button-section">
            <button className="create-button flex items-center  text-white px-4 py-2 rounded-lg">
              <Plus className="plus-icon mr-2" />
              <span className="btn-text" onClick={handleToggle}>
                Create Project
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
