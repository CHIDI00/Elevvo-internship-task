import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-[100vw] bg-white dark:bg-[#070a13]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="w-full flex-1 lg:p-8 p-4 flex justify-center">
          <main className="flex-1 max-w-[100rem]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
