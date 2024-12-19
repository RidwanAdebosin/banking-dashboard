import { Link } from "react-router-dom";
import {
  FaHome,
  FaDatabase,
  FaBook,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

const SideBar = () => {
  const [expandNav, setExpandNav] = useState(true);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const handleExpandNav = (): void => {
    if (window.screen.width <= 425) {
      setExpandNav(true);
    } else setExpandNav((prev) => !prev);
  };

  useEffect(() => {
    if (theme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeMode = (): void => {
    setTheme((theme) => !theme);
    document.body.classList.toggle("dark");
  };

  return (
    <section className="pt-24 text-gray-800 dark:text-gray-100">
      {expandNav ? (
        <ul className="flex flex-col items-center gap-6">
          <li className="p-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition">
            <Link to="/" aria-label="Home">
              <FaHome className="text-lg" />
            </Link>
          </li>
          <li className="p-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition">
            <Link to="transactions-page" aria-label="Transactions">
              <FaDatabase className="text-lg" />
            </Link>
          </li>
          <li className="p-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition">
            <Link to="customers" aria-label="Customers">
              <FaBook className="text-lg" />
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col gap-6 pl-4">
          <li className="p-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition flex items-center gap-3">
            <Link to="transactions-page" className="flex items-center gap-2">
              <FaDatabase className="text-lg" />
              <span>Transactions</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition flex items-center gap-3">
            <Link to="customers" className="flex items-center gap-2">
              <FaBook className="text-lg" />
              <span>Customers</span>
            </Link>
          </li>
        </ul>
      )}

      <div className="mt-24 flex flex-col items-center gap-6">
        <button
          onClick={handleExpandNav}
          className="hidden md:block p-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition"
          aria-label="Expand Navigation"
        >
          {expandNav ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>

        <button
          onClick={handleThemeMode}
          className="p-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition"
          aria-label={`Switch to ${theme ? "light" : "dark"} mode`}
        >
          {theme ? (
            <IoSunny className="text-lg" />
          ) : (
            <IoMoon className="text-lg" />
          )}
        </button>
      </div>
    </section>
  );
};

export default SideBar;
