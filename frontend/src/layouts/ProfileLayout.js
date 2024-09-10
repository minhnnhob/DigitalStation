import { Outlet } from "react-router-dom";

import Sidebar from "../components/sideBar/editProfileBar";

export default function ProfileLayout() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
