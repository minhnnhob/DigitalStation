import React from "react";
import { NavLink } from "react-router-dom";
import { FileUser, Handshake, FileUp } from "lucide-react";

const ManageJobBar = () => {
  return (
    <aside className="sidebar">
      <h2>Mange Job</h2>
      <ul>
        <li>
          <NavLink
            to="."
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FileUser /> Job Applications
          </NavLink>
        </li>
        <li>
          <NavLink
            to="recuitment"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Handshake /> Resume
          </NavLink>
        </li>
        <li>
          <NavLink
            to="job_posting"
            end 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FileUp /> My Job
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default ManageJobBar;
