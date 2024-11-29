import React from "react";

import { NavLink } from "react-router-dom";
import { FileUser, Handshake, FileUp, Menu, X } from "lucide-react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/userSlice";
import { useState } from "react";
const AdminSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex justify-center   w-[25%] h-screen  bg-bg-pf ">
      <div className="flex flex-col items-center rounded-l-lg  w-full h-full ">
        <h2 className="my-12 flex justify-center">
          <img
            src="https://res.cloudinary.com/dxlq68xw1/image/upload/v1732220710/Artboard_1_6x_zsabzk.png"
            alt=""
            className=" flex w-12 h-12 min-h-12 min-w-12 "
          />
        </h2>
        <ul className="w-full space-y-4 px-8 flex flex-col h-full overflow-y-auto ">
          <li className="text-xl w-[90%]">
            <NavLink
              to="."
              end
              className={({ isActive }) => (isActive ? "active   " : "  ")}
            >
              <FileUser size={36} /> Dashboard
            </NavLink>
          </li>
          <li className="text-xl w-[90%]">
            <NavLink
              to="manage-users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Handshake size={36} /> Manage Users
            </NavLink>
          </li>
          <li className="text-xl w-[90%]">
            <NavLink
              to="manage-topics"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FileUp size={36} /> Manage Topics
            </NavLink>
          </li>
        </ul>

        <button
          className="   w-[80%] py-2 my-12 bg-red-500 text-white rounded-lg"
          onClick={() => {
            handleLogout();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
