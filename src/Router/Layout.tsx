import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navigation from "../components/Navigation";
import { FilterProvider } from "../Context/FilterContext";

const Layout = () => {
  return (
    <FilterProvider>
      <div className="flex">
        <aside className=" bg-slate-100 px-4 dark:bg-blue-950 h-svh border-r">
          <SideBar />
        </aside>
        <div className="flex flex-col w-full pl-15">
          <header className=" w-full bg-slate-100 py-4 flex justify-end dark:bg-blue-950 dark:text-white items-center pr-4">
            <Navigation />
          </header>
          <main className="  dark:bg-blue-950">
            <Outlet />
          </main>
        </div>
      </div>
    </FilterProvider>
  );
};

export default Layout;
