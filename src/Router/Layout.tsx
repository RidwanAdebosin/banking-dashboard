import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navigation from "../components/Navigation";

const Layout = () => {
  return (
    <div className="flex w-full">
      <aside className="relative z-20 bg-slate-100 px-4 dark:bg-blue-950 h-screen border-r">
        <SideBar />
      </aside>

      <div className="flex flex-col h-screen w-full">
        <header className="bg-slate-100 py-4 flex justify-end dark:bg-blue-950 dark:text-white items-center pr-4">
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
