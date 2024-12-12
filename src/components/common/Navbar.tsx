import { Link } from "react-router";

const Navbar = ({ children, title }: any) => {
  return (
    <>
      <div className="relative">
        {/* Navbar Header */}
        <div className="navbar-header cursor-pointer">
          <Link to={"/"} className="flex justify-center items-center gap-5">
            {/* <Menu className="h-6 w-6" onClick={toggleLeftSection} /> */}
            <h2 className="text-3xl font-bold">{title}</h2>
          </Link>

          <div className="bg-gray-300 p-2 rounded-lg">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
