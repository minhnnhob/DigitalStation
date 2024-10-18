import { Link } from "react-router-dom";
import { logout } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import { IoIosNotifications, IoMdCart } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import ProfileMenu from "../profileMenu/ProfileMenu";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/Artboard 1@22x.png";

const NavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const { profilePicture } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <header className=" bg-bg-df py-2.5 px-2 min-w-sm sticky top-0 z-30 ">
      <div className="flex justify-between  items-center  mx-auto px-5  w-full ">
        <div className="flex text-gray-color ml-5 text-3xl font-black items-start min-w-max">
          <Link to="/">
            {/* <h1> DigiStation</h1> */}
            <img
              src={logo}
              alt="DigiStation"
              className="w-10 h-10 object-fit "
            />
          </Link>
        </div>
        {/* link */}
        <div className=" justify-between ">
          <nav className=" flex   pl-5 pr-6  ">
            <Link
              to="/"
              className="no-underline  text-gray-color hover:text-gray-light"
            >
              Explore
            </Link>
            {/* <Link
              to="/learn"
              className="no-underline  text-gray-color hover:text-gray-light"
            >
              Learn
            </Link>
            <Link
              to="/shop"
              className="no-underline  text-gray-color hover:text-gray-light"
            >
              Shop
            </Link> */}
            <Link
              to="/job/job-listings"
              className="no-underline  text-gray-color hover:text-gray-light"
            >
              Jobs
            </Link>
          </nav>
        </div>
        <div className=" lg:flex sm:hidden border-2 border-gray-border items-center rounded-full pl-6 mx-4 w-4/5  h-10">
          <FaSearch className="text-gray-color pr-1 text-2xl" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none text-gray-border outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-5 ">
          {/* <IoMdCart className="text-gray-color text-3xl cursor-pointer " /> */}
          <div className=" min-w-max">
            {loggedIn ? (
              <div className="flex items-center gap-5 ">
                <Link
                  to="/project/new"
                  className="no-underline  text-gray-color "
                >
                  <MdFileUpload className="text-gray-color text-3xl cursor-pointer hover:text-gray-light" />
                </Link>
                <div className="notification-icon">
                  <IoIosNotifications className="text-gray-color text-3xl cursor-pointer" />
                  <span className="notification-count">179</span>
                </div>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2.5 object-cover "
                  onClick={toggleMenu}
                />
              </div>
            ) : (
              <div className="flex w-full gap-4">
                <Link
                  to="/register"
                  className="bg-bg-pf font-semibold rounded-md px-6 py-2"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="login-link bg-primary font-semibold rounded-md px-6 py-2 "
                >
                  Log in
                </Link>
              </div>
            )}
          </div>
          <BsThreeDotsVertical className="text-gray-color text-2xl cursor-pointer" />
        </div>
      </div>
      <ProfileMenu
        visible={menuVisible}
        onClose={toggleMenu}
        handleLogout={handleLogout}
        className="pr-4"
      />
    </header>
  );
};

export default NavBar;
