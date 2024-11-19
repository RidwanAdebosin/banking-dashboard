import { Link } from "react-router-dom";
import {
  FaHome,
  FaDatabase,
  FaBook,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

const SideBar = () => {
  const [expandNav, setExpandNav] = useState(false);
  const [theme, setTheme] = useState(false);

  // function toggling the aside bar
  const handleExpandNav = (): void => {
    setExpandNav(!expandNav);
  };

  // function handling the dark mode
  const handleThemeMode = (): void => {
    setTheme(!theme);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <section className="  dark:text-white pt-[100px]">
        {expandNav ? (
          <ul className="list-type-none flex flex-col gap-4  justify-center items-center ">
            <li className="p-2 hover:rounded-full hover:bg-slate-400">
              <Link to="/" className="">
                <FaHome />
              </Link>
            </li>

            <li className="p-2 hover:rounded-full hover:bg-slate-400">
              <Link to="transactions-page" className="">
                <FaDatabase />
              </Link>
            </li>
            <li className="p-2 hover:rounded-full hover:bg-slate-400">
              <Link to="customers-page">
                <FaBook />
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="  flex-col gap-4 justify-center items-start ">
            <li className="list-type-none  p-2 hover:rounded-full hover:bg-slate-400">
              <Link to="/" className="flex items-center gap-1">
                <span>
                  <FaHome />
                </span>
                Home
              </Link>
            </li>

            <li className="list-type-none  p-2 hover:rounded-full hover:bg-slate-400">
              <Link to="transactions-page" className="flex items-center gap-1">
                <span>
                  <FaDatabase />
                </span>
                Transactions
              </Link>
            </li>

            <li className="list-type-none  p-2 hover:rounded-full hover:bg-slate-400">
              <Link to="customers" className="flex items-center gap-1">
                <span>
                  <FaBook />
                </span>
                Customers
              </Link>
            </li>
          </ul>
        )}

        <button
          onClick={() => handleExpandNav()}
          className="lg:px-4 px-2  py-2 mt-28 cursor-pointer hover:rounded-full hover:bg-slate-400 block dark:text-white"
          role="expand"
          aria-label="expand navigation"
        >
          {expandNav ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>

        <button
          className="dark:text-white lg:px-4 py-2 px-2 mt-8 cursor-pointer hover:rounded-full hover:bg-slate-400 block"
          role="switch"
          aria-checked={theme}
          aria-label={`Switched to ${theme ? "dark" : "light"} mode`}
          onClick={() => handleThemeMode()}
        >
          {theme ? (
            <IoSunny aria-hidden="true" />
          ) : (
            <IoMoon aria-hidden="true" />
          )}
        </button>
      </section>
    </>
  );
};

export default SideBar;
