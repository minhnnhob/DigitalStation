import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import AdminSideBar from "../components/admin/AdminSideBar";

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
    <div className=" flex justify-between w-full p-4 ">
     <AdminSideBar />
      <main className=" w-[80%] ">
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
