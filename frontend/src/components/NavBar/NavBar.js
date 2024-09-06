import { Link } from "react-router-dom";
import { logout } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSearch,
  FaBell,
  FaUpload,
  FaShoppingCart,
  FaEllipsisV,
} from "react-icons/fa";
import { useState } from "react";
import ProfileMenu from "../profileMenu/ProfileMenu";

const NavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <header className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            {/* <img src="/path-to-your-logo.svg" alt="Logo" className="logo-icon" /> */}
            <h1>DigiStation</h1>
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/explore">Explore</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/jobs">Jobs</Link>
        </nav>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        <div className="user-actions">
          <FaUpload className="icon" />
          <div className="notification-icon">
            <FaBell className="icon" />
            <span className="notification-count">179</span>
          </div>
          <FaShoppingCart className="icon" />
          <div className="user-profile">
            {loggedIn ? (
              <>
                <img
                  src="https://cdna.artstation.com/p/users/avatars/003/335/420/medium/f33bfbdbaae4201808d02ed394bc4c6c.jpg?1629021119"
                  alt="Profile"
                  className="profile-pic"
                  onClick={toggleMenu}
                />
              
                {/* <button onClick={handleLogout}>Log out</button> */}
              </>
            ) : (
              <Link to="/login" className="login-link">
                Log in
              </Link>
            )}
          </div>
          <FaEllipsisV className="icon" />
        </div>
      </div>
      <ProfileMenu visible={menuVisible} onClose={toggleMenu} handleLogout={handleLogout} />
    </header>
  );
};

export default NavBar;
