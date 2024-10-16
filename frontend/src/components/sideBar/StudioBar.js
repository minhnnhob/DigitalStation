
import React from "react";
import { NavLink } from "react-router-dom";
import { FileUser, Handshake } from "lucide-react";

const StudioBar = () => {
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
                <Handshake /> Recuiment
              </NavLink>
            </li>
          </ul>
        </aside>
      );
}
export default StudioBar;