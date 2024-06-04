import React, { useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import logoImg from "../../assets/logoRed.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import DashboardImg from "../../assets/PNGS/Donors.svg";
import PledgeImg from "../../assets/PNGS/Pledges.svg";
import TransactionImg from "../../assets/PNGS/Transactions.svg";
import DonorsImg from "../../assets/PNGS/Donor.svg";
import CampaignImg from "../../assets/PNGS/Campaigns.svg";
import CommsImg from "../../assets/PNGS/Comissions.svg";
import SettingsImg from "../../assets/PNGS/Settings.png";
import UsersImg from "../../assets/PNGS/Users.svg";
import ApiImg from "../../assets/PNGS/APIs.svg";
import LogsImg from "../../assets/PNGS/Logs.png"
import { FaAngleDown } from "react-icons/fa6";
import WelcomeMessage from './WelcomeMessage';


const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const activeStyle = ({ isActive }) =>
    isActive
      ? "flex items-center space-x-2 p-3 rounded-xl text-white bg-custom-red"
      : "flex items-center space-x-2 p-3 rounded text-black";

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const getSettingsClassName = () =>
    isSettingsOpen
      ? "flex items-center space-x-2 p-3 rounded-xl text-white bg-custom-red"
      : "flex items-center space-x-2 p-3 rounded text-black hover:bg-custom-red";

      useEffect(() => {
    const handleResize = () => {
      // Collapse sidebar when window width is less than 768 pixels
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex text-black'>
      <div
        className={`${open ? "w-[16vw]" : "w-20"} w-24 pr-2 bg-white h-[100vh] p-5 pt-8 relative duration-300`}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={`absolute cursor-pointer -right-1 top-20 w-7
           border-2 rounded-lg bg-white p-1  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        
        <img src={logoImg} alt="Logo" className={`cursor-pointer duration-500 ${open ? "w-32 h-20 ml-12" : "w-20 h-12"}`}/>

        <ul className="space-y-2 tracking-wide mt-8 font-bold font-sans text-lg ">
          {[
            { path: "/dashboard", img: DashboardImg, title: "Dashboard" },
            { path: "/dashboard/pledges", img: PledgeImg, title: "Pledges" },
            { path: "/dashboard/transactions", img: TransactionImg, title: "Transactions" },
            { path: "/dashboard/donors", img: DonorsImg, title: "Donors" },
            { path: "/dashboard/campaigns", img: CampaignImg, title: "Campaigns" },
            { path: "/dashboard/commissions", img: CommsImg, title: "Commissions" },
          ].map((item, index) => (
            <li key={index}>
              
              <NavLink to={item.path} className={activeStyle} end>
                <img
                  src={item.img}
                  alt={item.title}
                  className={`ml-2 ${open ? "h-8 w-8" : "h-8 w-8"}`}
                />
                <span className={`${open ? "block" : "hidden"} origin-left duration-200`}>
                  {item.title}
                </span>
              </NavLink>
            </li>
          ))}
          {/* Settings Navigation */}
          <li>
            <NavLink
              to="#"
              className={getSettingsClassName}
              onClick={toggleSettings}
            >
              <img src={SettingsImg} alt="Settings" className={`ml-2 ${open ? "h-8 w-8" : "h-5 w-5"}`} />
              <span className={`${open ? "block" : "hidden"} origin-left duration-200`}>
                Settings
              </span>
              <FaAngleDown />
            </NavLink>
            {isSettingsOpen && (
              <ul className="ml-6 mt-1">
                <li>
                  <NavLink to="/dashboard/settings/users" className={activeStyle}>
                    <img src={UsersImg} alt="Users" className={`ml-2 ${open ? "h-6 w-6" : "h-4 w-4"}`} />
                    <span className={`${open ? "block" : "hidden"} origin-left duration-200`}>
                      Users
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/settings/api" className={activeStyle}>
                    <img src={ApiImg} alt="API" className={`ml-2 ${open ? "h-6 w-6" : "h-4 w-4"}`} />
                    <span className={`${open ? "block" : "hidden"} origin-left duration-200`}>
                      API
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/settings/logs" className={activeStyle}>
                    <img src={LogsImg} alt="API" className={`ml-2 ${open ? "h-6 w-6" : "h-4 w-4"}`} />
                    <span className={`${open ? "block" : "hidden"} origin-left duration-200`}>
                      Logs
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className='w-full mt-2'>
      <WelcomeMessage />
        <Outlet />
      </div>
    </div>
  )
}

export default Sidebar;
