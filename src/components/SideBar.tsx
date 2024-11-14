import { Link } from "react-router-dom";
import {
  FaHome,
  FaDatabase,
  FaBook,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import { useState } from "react";

const SideBar = () => {
  const [expandNav, setExpandNav] = useState(false);

  const handleExpandNav = () => {
    setExpandNav(!expandNav);
  };

  return (
    <>
      <div>
        {expandNav ? (
          <div className=" h-[50%] flex flex-col gap-4 justify-center items-start text-white pt-[100px] px-4">
            <Link to="/" className="hover:rounded-full hover:bg-slate-400">
              <li className="list-type-none flex items-center gap-1 p-2">
                <span>
                  <FaHome />
                </span>
              </li>
            </Link>

            <Link
              to="transactions-page"
              className="hover:rounded-full hover:bg-slate-400"
            >
              <li className="list-type-none flex items-center gap-1 p-2">
                <span>
                  <FaDatabase />
                </span>
              </li>
            </Link>
            <Link
              to="customers-page"
              className="hover:rounded-full hover:bg-slate-400"
            >
              <li className="list-type-none flex items-center gap-1 p-2">
                <span>
                  <FaBook />
                </span>
              </li>
            </Link>
          </div>
        ) : (
          <div className=" h-[50%]  flex-col gap-4 justify-center items-start text-white pt-[100px] px-4">
            <Link to="/">
              <li className="list-type-none flex items-center gap-1 p-2 hover:rounded-full hover:bg-slate-400">
                <span>
                  <FaHome />
                </span>
                Home
              </li>
            </Link>

            <Link to="transactions-page">
              <li className="list-type-none flex items-center gap-1 p-2 hover:rounded-full hover:bg-slate-400">
                <span>
                  <FaDatabase />
                </span>
                Transactions
              </li>
            </Link>
            <Link to="customers-page">
              <li className="list-type-none flex items-center gap-1 p-2 hover:rounded-full hover:bg-slate-400">
                <span>
                  <FaBook />
                </span>
                Customers
              </li>
            </Link>
          </div>
        )}

        <div className="px-4">
          <button
            onClick={() => handleExpandNav()}
            className="px-2  py-2 mt-8 cursor-pointer hover:rounded-full hover:bg-slate-400 block text-white"
            role="button"
          >
            {expandNav ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>
        </div>

        <div className="pl-6 py-2 mt-8 cursor-pointer" aria-role="switch">
          <label
            htmlFor="switch"
            className=" cursor-pointer text-white text-sm pb-2"
          >
            Change theme
            <input
              id="switch"
              type="checkbox"
              value=""
              role="switch"
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
          </label>
        </div>
      </div>
    </>
  );
};

export default SideBar;
