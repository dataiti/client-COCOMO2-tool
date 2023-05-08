import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="w-full">
      <div className="w-[18%] h-full min-h-screen max-h-screen fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="w-[82%] ml-[18%]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
