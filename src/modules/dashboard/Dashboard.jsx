import React from "react";
import SideBar from "./SideBars";
import { Outlet } from "react-router-dom";
import WelcomeMessage from "./WelcomeMessage";

const Dashboard = () => {
  return (
    <div>
       <SideBar />

      
    </div>
  );
};

export default Dashboard;
