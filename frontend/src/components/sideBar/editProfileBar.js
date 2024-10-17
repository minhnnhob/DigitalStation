// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaFileAlt,
  FaUserFriends,
  FaSlidersH,
  FaKey,
  FaEnvelopeOpenText,
  FaShieldVirus,
  FaWallet,
} from "react-icons/fa";

import { formatCreateAt } from "../../lib/date";

import { useSelector } from "react-redux";
const ProfileSidebar = () => {
  const { userInfor } = useSelector((state) => state.user);

  return (
    <aside className="mt-8 w-[30%] ">
      {/* image... */}
      <div className=" flex justify-start w-full items-center">
        <div className="">
          <img
            src={userInfor.profilePicture}
            alt="Profile Avatar"
            className=" flex-start object-cover w-28 h-28 min-h-28 min-w-28 rounded-full ring-2 ring-white"
          />
        </div>

        <div className=" ml-4">
          <div className="text-xl font-bold">{userInfor.name}</div>
          <div className="text-sm w-32 text-gray-400">
            Member since {formatCreateAt(userInfor.createdAt)}
          </div>
        </div>
      </div>
      {/* menu */}
      <div className="mt-8 ">
        <ul>
          <li>
            <NavLink
              to="."
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUserCircle /> Information
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/resume"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaFileAlt /> Resume
            </NavLink>
          </li>
          <hr className="opacity-45"></hr>
          <li>
            <NavLink
              to="/social"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUserFriends /> Social
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaSlidersH /> Account Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/security"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaKey /> Password & Security
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/messaging"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaEnvelopeOpenText /> Messaging/Emails
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/two-factor-auth"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaShieldVirus /> Two-Factor Auth
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/billing"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaWallet /> Billing & Shipping
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
