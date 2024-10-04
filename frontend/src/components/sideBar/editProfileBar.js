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

import { useSelector } from "react-redux";
const ProfileSidebar = () => {

  const { profilePicture } = useSelector((state) => state.user);

  return (
    <aside className="sidebar">
      <div className="profile-section">
        <img
          src={profilePicture}
          alt="Profile Avatar"
          className="profile-pic"
        />
        <div className="profile-info">
          <span className="profile-name">minh nguyễn</span>
          <span className="profile-membership">Member since August 2021</span>
        </div>
      </div>
      <h2>PROFILE</h2>
      <ul>
        <li>
          <NavLink
            to="/profile"
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
    </aside>
  );
};

export default ProfileSidebar;
