import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../components/loading/Loading";

const AdminLayout = () => {
  const id = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);
  const loading = useSelector((state) => state.user.loading);

  console.log(id);
  console.log(role);
  console.log(loading);

  

  const navigate = useNavigate();

  useEffect(() => {
    if ( role !== "admin") {
      // navigate("/login");
    }
  },[id, role, navigate]);



  if (loading) return <Loading />;

  return (
    <div className=" flex justify-center w-full">
      <nav className=" items-start">
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/manage-users">Manage Users</Link>
          </li>{" "}
          <li>
            <Link to="/admin/manage-topics">Manage Topics</Link>
          </li>
          {/* Add more admin links as needed */}
        </ul>
      </nav>
      <main className="main-content w-full">
        <Outlet />
      </main>
      <Toaster
        position="top-left"
        autoClose={14}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
    </div>
  );
};

export default AdminLayout;
