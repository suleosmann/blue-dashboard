// WelcomeMessage.js
import React from "react";
import { useAuth } from "../../context/AuthContext";

const WelcomeMessage = () => {
  // Accept toggleSidebar as a prop
  const { user } = useAuth();

  // Generate initials from user's name
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
  };

  if (!user) {
    return <p>Loading or not logged in...</p>;
  }

  const initials = getInitials(user.firstName, user.lastName);

  return (
    <div className="w-full h-24 rounded-lg bg-custom-red">
      <div className="p-4 md:p-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl md:text-2xl text-white">
            Welcome Back, {user.firstName}!
          </h3>
        </div>
        <div className="flex">
        <div className="w-10 h-10 md:w-12 md:h-12 p-2 md:p-3 rounded-full bg-gray-200 flex items-center justify-center text-lg md:text-xl">
          {initials}
        </div>
         
      </div>

      </div>
    </div>
  );
};

export default WelcomeMessage;
