import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navigation from "../components/Navigation";

const AdminDashBoard = () => {
  return (
    <div className="flex">
      <aside className="bg-black h-screen">
        <SideBar />
      </aside>

      <div className="grid h-screen w-full">
        <header className="h-[20%] flex justify-end bg-black text-white font-bold items-center pr-4">
          <Navigation />
        </header>
        <main className="h-[80%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashBoard;
