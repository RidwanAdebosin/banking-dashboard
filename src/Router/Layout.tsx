import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navigation from "../components/Navigation";

const Layout = () => {
  return (
    <div className="flex">
      <aside className="relative z-20 bg-slate-100 px-4 dark:bg-blue-950 h-screen border-r">
        <SideBar />
      </aside>

      <div className="flex flex-col h-screen w-full">
        <header className="fixed w-full bg-slate-100 py-4 mb-10 flex justify-center dark:bg-blue-950 dark:text-white items-center">
          <Navigation />
        </header>
        <main className="mt-14  dark:bg-blue-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
