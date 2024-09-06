// src/pages/EditProfile.js
import React from 'react';
import Sidebar from '../components/sideBar/editProfileBar';
import ProfileForm from '../components/profile/editProfile';


const EditProfile = () => {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <ProfileForm />
        
      </main>
    </div>
  );
};

export default EditProfile;
