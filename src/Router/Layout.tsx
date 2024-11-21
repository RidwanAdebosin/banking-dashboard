import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navigation from "../components/Navigation";
import { FilterProvider } from "../Context/FilterContext";

const Layout = () => {
  return (
    <FilterProvider>
      <div className="flex h-screen">
        <aside className=" h-svh bg-slate-100 px-4 dark:bg-blue-950 border-r">
          <SideBar />
        </aside>
        <div className="flex flex-col w-full pl-15">
          <header className="bg-slate-100 py-4 flex justify-end dark:bg-blue-950 dark:text-white items-center pr-4">
            <Navigation />
          </header>
          <main className="overflow-y-scroll  dark:bg-blue-950">
            <Outlet />
          </main>
        </div>
      </div>
    </FilterProvider>
  );
};

export default Layout;
