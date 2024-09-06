// src/components/ProfileForm.js
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCurrentUser,
  fetchUserInfo,
  updateUser,
} from "../../store/slices/userSlice";


const EditProfile = () => {
  const dispatch = useDispatch();
  const { id, userInfor, loading, error } = useSelector((state) => state.user);
  // const user = useSelector((state) => state.user);
  // console.log(user);
  // console.log(userInfor.name);

  useEffect(() => {
    if (!id) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserInfo(id));
    }

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error}</p>;
  }, [dispatch, id]);

  // console.log(userIfor.name);
  //

  useEffect(() => {
    if (userInfor) {
      setName(userInfor.name);
      setHeadline(userInfor.headline);
      setCity(userInfor.city);
      setCountry(userInfor.country);
      // setAvatar(userInfor.avatar);
      // setCoverImage(userInfor.coverImage);
    }
  }, [dispatch, userInfor]);
  const [name, setName] = useState();
  const [headline, setHeadline] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [avatar, setAvatar] = useState(
    "https://cdna.artstation.com/p/users/avatars/003/335/420/medium/f33bfbdbaae4201808d02ed394bc4c6c.jpg?1629021119"
  );
  // const [coverImage, setCoverImage] = useState("/path-to-cover.jpg");
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleCoverImageChange = (e) => {
    // setCoverImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = (e) => {
    // Save profile changes logic here
    e.preventDefault();
    const updateUserDt = {
      id: id,
      name: name,
      headline: headline,
      city: city,
      country: country,
    };
    try {
      dispatch(updateUser(updateUserDt));
      console.log("User updated successfully");
    } catch (error) {
      console.log("Error updating user:", error);
      // setTimeout(() => {
        
      // }, 2000);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1 className="profile-h-edit">Edit Profile</h1>
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-info">
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
            <button className="upload-avatar-btn">
              Upload New Avatar
              <input type="file" onChange={handleAvatarChange} />
            </button>
            {/* </div> */}

            {/* <div> */}
            <div
              className="cover-image"
              // style={{ backgroundImage: `url(${coverImage})` }}
            >
              <button className="change-cover-btn">
                Change cover image (1920x640)
                <input type="file" onChange={handleCoverImageChange} />
              </button>
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
