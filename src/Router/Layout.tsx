import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navigation from "../components/Navigation";

const Layout = () => {
  return (
    <div className="flex">
      <aside className="bg-slate-100 px-4 dark:bg-blue-950 h-screen">
        <SideBar />
      </aside>

      <div className="flex flex-col h-screen w-full">
        <header className="bg-slate-100 border py-2 flex justify-end dark:bg-blue-950 dark:text-white items-center pr-4">
          <Navigation />
        </header>
        <main className="h-[100%]  dark:bg-blue-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
