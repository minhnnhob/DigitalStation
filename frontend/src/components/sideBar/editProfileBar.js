// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaFileAlt, FaUserFriends, FaSlidersH, FaKey, FaEnvelopeOpenText, FaShieldVirus, FaWallet } from 'react-icons/fa';

const ProfileSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="profile-section">
        <img src="https://cdna.artstation.com/p/users/avatars/003/335/420/medium/f33bfbdbaae4201808d02ed394bc4c6c.jpg?1629021119" alt="Profile Avatar" className="profile-pic" />
        <div className="profile-info">
          <span className="profile-name">minh nguyễn</span>
          <span className="profile-membership">Member since August 2021</span>
        </div>
      </div>
      <h2>PROFILE</h2>
      <ul>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaUserCircle /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/resume" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaFileAlt /> Resume
          </NavLink>
        </li>
        <li>
          <NavLink to="/social" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaUserFriends /> Social
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaSlidersH /> Account Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/security" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaKey /> Password & Security
          </NavLink>
        </li>
        <li>
          <NavLink to="/messaging" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaEnvelopeOpenText /> Messaging/Emails
          </NavLink>
        </li>
        <li>
          <NavLink to="/two-factor-auth" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaShieldVirus /> Two-Factor Auth
          </NavLink>
        </li>
        <li>
          <NavLink to="/billing" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaWallet /> Billing & Shipping
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
