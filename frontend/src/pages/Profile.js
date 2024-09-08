// src/pages/EditProfile.js
import React from "react";
import Sidebar from "../components/sideBar/editProfileBar";
import ProfileForm from "../components/profile/editProfile";
import { Route, Routes } from "react-router-dom";

const EditProfile = () => {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProfileForm />} />
          {/* <Route path="/resume" element={<ProfileForm />} /> */}
        </Routes>
       
      </main>
    </div>
  );
};

export default EditProfile;
