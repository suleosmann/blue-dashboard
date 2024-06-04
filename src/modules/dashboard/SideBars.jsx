import React, { useState, useEffect, useRef } from "react";
import { NavLink as RouterNavLink, Outlet } from "react-router-dom";
import DashboardImg from "../../assets/PNGS/Donors.svg";
import PledgeImg from "../../assets/PNGS/Pledges.svg";
import TransactionImg from "../../assets/PNGS/Transactions.svg";
import DonorsImg from "../../assets/PNGS/Donor.svg";
import CommsImg from "../../assets/PNGS/Comissions.svg";
import SettingsImg from "../../assets/PNGS/Settings.png";
import UsersImg from "../../assets/PNGS/Users.svg";
import ApiImg from "../../assets/PNGS/APIs.svg";
import LogsImg from "../../assets/PNGS/Logs.png";
import WelcomeMessage from "./WelcomeMessage";
import logoRed from "../../assets/logoRed.png";
import RolesImg from "../../assets/PNGS/Roles.svg"
import { FaTimes, FaBars, FaCaretDown, FaCaretRight } from "react-icons/fa"; // Ensure you import caret icons for toggling indication

const NavLink = ({ imgSrc, label, to, onClick }) => (
  <RouterNavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center space-x-2 p-3 rounded text-black hover:text-white ${
        isActive
          ? "flex items-center space-x-2 p-3 rounded-xl text-white bg-custom-red"
          : "rounded-xl hover:bg-red-100 dark:hover:bg-custom-red"
      }`
    }
  >
    {imgSrc && <img src={imgSrc} className="ml-4 w-12 h-8" alt={label} />}
    <span className="ml-4">{label}</span>
  </RouterNavLink>
);

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State to manage the visibility of the Settings submenu

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen); // Function to toggle the settings submenu

  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 bg-white shadow-lg z-30 transition-transform rounded-3xl duration-300 ease-in-out ${
          isOpen ? "translate-x-3 h-[95vh] mt-10" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:w-64`}
      >
        <div className="py-4 px-3 bg-white dark:bg-white h-full overflow-y-auto rounded-2xl">
          <ul className="space-y-2">
            {isOpen && (
              <FaTimes
                className="text-black text-2xl md:text-3xl"
                onClick={toggleSidebar}
              />
            )}
            <img src={logoRed} className="h-24 ml-4 mb-4" />
            <NavLink imgSrc={DashboardImg} label="Dashboard" to="/dashboard" />
            <NavLink imgSrc={PledgeImg} label="Pledges" to="/dashboard/pledges" />
            <NavLink imgSrc={TransactionImg} label="Transactions" to="/dashboard/transactions" />
            <NavLink imgSrc={DonorsImg} label="Donors" to="/dashboard/donors" />
            <NavLink imgSrc={CommsImg} label="Commissions" to="/dashboard/commissions" />

            {/* Settings and its submenu */}
            <li className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-600" onClick={toggleSettings}>
              <div className="flex items-center space-x-2">
                <img src={SettingsImg} className="ml-4 w-12 h-8" alt="Settings" />
                <span className="ml-4">Settings</span>
              </div>
              {isSettingsOpen ? <FaCaretDown /> : <FaCaretRight />}
            </li>
            {isSettingsOpen && (
              <>
                <NavLink imgSrc={UsersImg} label="Users" to="/dashboard/settings/users" />
                <NavLink imgSrc={RolesImg} label="Roles" to="/dashboard/settings/roles" />
                <NavLink imgSrc={LogsImg} label="Logs" to="/dashboard/settings/logs" />
                <NavLink imgSrc={ApiImg} label="API" to="/dashboard/settings/api" />

              </>
            )}
          </ul>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex bg-custom-red">
            <WelcomeMessage toggleSidebar={toggleSidebar} isOpen={isOpen} />
            {!isOpen && (
                  <FaBars
                    className="text-white text-2xl md:text-3xl mt-6 mr-4 md:hidden" 
                    onClick={toggleSidebar}
                  />
                )}
        </div>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SideBar;
