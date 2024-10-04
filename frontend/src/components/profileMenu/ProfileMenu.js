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
      <div className="profile-header">
        <img src={profilePicture} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <div className="profile-name">{name}</div>
          <div className="profile-links min-w-max">
            <Link to="/portfolio">View Profile</Link>
            <span> · </span>
            <Link to="/edit-profile">Edit Profile</Link>
          </div>
        </div>
      </div>
      <Link to="/collections">My Collections</Link>
      <Link to="/wishlist">My Wishlist</Link>
      <Link to="/learning">My Learning</Link>
      <Link to="/orders">Order History</Link>
      <Link to="/portfolio">Manage Portfolio</Link>
      <Link to="/website-builder">Website Builder</Link>
      <Link to="/share-art">Share Your Art</Link>
      <button onClick={handleLogout}>Log out</button>
    </div>
  </div>
  );
};

export default ProfileMenu;
