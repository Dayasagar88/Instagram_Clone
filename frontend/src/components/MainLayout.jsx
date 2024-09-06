import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="w-screen">
      <Sidebar/>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
