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
        {expandNav && (
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
        )}

        <div className=" h-[50%]  flex-col gap-4 justify-center items-start text-white pt-[100px] px-4">
          <Link to="/" className="hover:rounded-full hover:bg-slate-400 ">
            <li className="list-type-none flex items-center gap-1 p-2">
              <span>
                <FaHome />
              </span>
              Home
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
              Transactions
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
              Customers
            </li>
          </Link>
        </div>

        <div
          onClick={() => handleExpandNav()}
          className=" px-6 py-2 mt-8 cursor-pointer hover:rounded-full hover:bg-slate-400 block text-white"
        >
          {expandNav ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </div>
      </div>
    </>
  );
};

export default SideBar;
