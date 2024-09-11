import { Outlet } from "react-router-dom";

import Sidebar from "../components/sideBar/editProfileBar";
import { Toaster } from "react-hot-toast";

export default function ProfileLayout() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <Toaster position="top-left"
      autoClose={14}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition="Bounce" />
    </div>
  );
}
