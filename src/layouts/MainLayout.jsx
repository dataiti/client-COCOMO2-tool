import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="grid grid-cols-10 min-h-screen">
      <div className="col-span-2 h-full">
        <Sidebar />
      </div>
      <div className="col-span-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
