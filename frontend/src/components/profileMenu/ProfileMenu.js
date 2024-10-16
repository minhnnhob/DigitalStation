import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const ProfileMenu = ({ visible, onClose, handleLogout }) => {

    const name = useSelector((state) => state.user.name);
    const { profilePicture } = useSelector((state) => state.user);
   

  if (!visible) return null;

  return (
    <div className="profile-menu-overlay" onClick={onClose}>
    <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-center items-center">
        <img src={profilePicture} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <div className="profile-name">{name}</div>
          <div className="profile-links min-w-max" onClick={onClose} >
            <Link  to="/portfolio">View Profile</Link>
            <span> · </span>
            <Link to="/edit-profile">Edit Profile</Link>
          </div>
        </div>
      </div>
      <Link to="/collections">My Collections</Link>
      <Link to="/job_manage">Manage Job</Link>
      <hr className="opacity-40"></hr>
      <Link to="/portfolio">Manage Portfolio</Link>
      <button onClick={handleLogout}>Log out</button>
    </div>
  </div>
  );
};

export default ProfileMenu;
