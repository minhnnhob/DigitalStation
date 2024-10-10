// src/components/ProfileForm.js
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCurrentUser,
  fetchUserInfo,
  updateUser,
} from "../../store/slices/userSlice";
import axios from "axios";

import Loading from "../loading/Loading";
import {
  showNotification,
  hideNotification,
} from "../../store/slices/notificationSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { id, userInfor } = useSelector((state) => state.user);

  const [loadingl, setLoadingl] = useState(false);

  const [name, setName] = useState(userInfor.name || "");
  const [headline, setHeadline] = useState(userInfor.headline || "");
  const [city, setCity] = useState(userInfor.city || "");
  const [country, setCountry] = useState(userInfor.country || "");

  const [avatar, setAvatar] = useState(userInfor.profilePicture || "");
  const [coverImage, setCoverImage] = useState(userInfor.coverPicture || "");
  const [profilePicture, setProfilePicture] = useState(
    userInfor.profilePicture || null
  );
  const [coverPicture, setCoverPicture] = useState(
    userInfor.coverPicture || null
  );

  useEffect(() => {
    if (!id) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserInfo(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (userInfor) {
      setName(userInfor.name || "");
      setHeadline(userInfor.headline || "");
      setCity(userInfor.city || "");
      setCountry(userInfor.country || "");
      setAvatar(userInfor.profilePicture || "");
      setCoverImage(userInfor.coverPicture || "");
    }
  }, [dispatch, userInfor]);

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setProfilePicture(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(URL.createObjectURL(e.target.files[0]));
    setCoverPicture(e.target.files[0]);
  };

  const handleSave = async (e) => {
    // Save profile changes logic here
    e.preventDefault();
    const fromData = new FormData();

    fromData.append("name", name);
    fromData.append("headline", headline);
    fromData.append("city", city);
    fromData.append("country", country);
    fromData.append("profilePicture", profilePicture);
    fromData.append("coverPicture", coverPicture);
    setLoadingl(true);

    console.log(profilePicture);

    for (var pair of fromData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }  

    
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/users`,
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("User updated successfully");
        dispatch(updateUser(response.data));
        dispatch(
          showNotification({
            type: "success",
            message: "Profile updated successfully",
          })
        );
        setTimeout(() => {
          dispatch(hideNotification());
        }, 3000);
      }
    } catch (error) {
      dispatch(
        showNotification({ type: "error", message: "Profile update failed" })
      );
      setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
    }
    setLoadingl(false);
  };

  if (loadingl) {
    return (
      <div className="profile-container w-1/2">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <h1 className="profile-h-edit ">Edit Profile</h1>
      <div className="profile-container bg-bg-df">
        <div className="profile-content">
          <div className="profile-info ">
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Professional Headline
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </label>
            <label>
              City
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label>
              Country
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
          </div>

          <div className="avatar-section">
            {/* <div> */}
            <div>
              <img src={avatar} alt="Avatar" className="avatarProfile" />
            </div>
            {/* <button className="upload-avatar-btn"> */}
            Upload New Avatar
            <input type="file" onChange={handleAvatarChange} />
            {/* </button> */}
            {/* </div> */}
            {/* <div> */}
            <div
              className="cover-image"
              style={{ backgroundImage: `url(${coverImage})` }}
            >
              {/* <button className="change-cover-btn"> */}
              Change cover image (1920x640)
              <input type="file" onChange={handleCoverImageChange} />
              {/* </button> */}
            </div>
            {/* </div> */}
          </div>
        </div>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default EditProfile;
