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

import ButtonUpload from "../Button/Button";
import InforInput from "../input/inforInput";
import { ArrowUp } from "lucide-react";

const EditProfile = () => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.id);
  const userInfor = useSelector((state) => state.user.userInfor);
  const user = useSelector((state) => state.user);

  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    if (!id) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchUserInfo(id));
  }, [dispatch, id]);

  const [loadingl, setLoadingl] = useState(false);

  const [name, setName] = useState(userInfor?.name || "");
  const [headline, setHeadline] = useState(userInfor?.headline || "");
  const [city, setCity] = useState(userInfor?.city || "");
  const [country, setCountry] = useState(userInfor?.country || "");

  const [avatar, setAvatar] = useState(userInfor?.profilePicture || "");
  const [coverImage, setCoverImage] = useState(userInfor?.coverPicture || "");

  const [avatarFile, setAvatarFile] = useState(userInfor?.profilePicture);
  const [coverImageFile, setCoverImageFile] = useState(userInfor?.coverPicture);

  useEffect(() => {
    if (userInfor) {
      setName(userInfor.name || "");
      setHeadline(userInfor.headline || "");
      setCity(userInfor.city || "");
      setCountry(userInfor.country || "");
      setAvatar(userInfor?.profilePicture || "");
      setCoverImage(userInfor?.coverPicture || "");
    }
  }, [dispatch, userInfor]);

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setAvatarFile(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(URL.createObjectURL(e.target.files[0]));
    setCoverImageFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    // Save profile changes logic here
    e.preventDefault();
    const fromData = new FormData();

    fromData.append("name", name);
    fromData.append("headline", headline);
    fromData.append("city", city);
    fromData.append("country", country);
    fromData.append("profilePicture", avatarFile);
    fromData.append("coverPicture", coverImageFile);
    setLoadingl(true);
    for (var pair of fromData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
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

  if (loading) {
    return (
      <div className="profile-container w-1/2">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <h1 className="w-full text-3xl rounded-t-md font-bold bg-bg-pf px-10 py-6">
        {" "}
        Profile
      </h1>
      <div className="  bg-[#19191f] w-full h-full  px-8 py-8">
        <div className="flex gap-4 justify-around">
          {/* Information */}
          <div className=" w-[45%] space-y-6">
            <InforInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />

            <InforInput
              label={"Professional Headline"}
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />

            <InforInput
              label={"City"}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <InforInput
              label={"Country"}
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="w-[55%] ">
            <label>Avatar</label>
            <div className=" flex-col justify-center items-center  bg-bg-pf rounded-sm border-2 border-gray-500 p-4  mb-4">
              <div className="flex justify-center items-center  p-4">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
              <div className="flex justify-center items-center">
                <label className="flex  border-2 border-gray-600  gap-2 px-3 py-2 bg-bg-df text-white rounded-sm cursor-pointer hover:bg-gray-700 transition-colors mb-2">
                  <ArrowUp size={16} />
                  <span className="text-sm font-medium">
                    {" "}
                  Upload Avatar
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
            <label>Cover Image</label>
            <div className=" flex-col justify-center items-center  bg-bg-pf rounded-sm border-2 border-gray-500 p-4 mb-4">
              <div className="flex justify-center items-center w-full  p-4">
                <img
                  src={coverImage}
                  alt="coverImage"
                  className="w-32 h-full  object-cover"
                />
              </div>
              <div className=" ">
                <label className="flex  border-2 border-gray-600  gap-2 px-3 py-2 bg-bg-df text-white rounded-sm cursor-pointer hover:bg-gray-700 transition-colors mb-2">
                  <ArrowUp size={16} />
                  <span className="text-sm font-medium">
                    {" "}
                    Change cover image (1920x640+)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleCoverImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            {/* </div> */}
          </div>
        </div>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
