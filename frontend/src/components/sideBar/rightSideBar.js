import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faLocationDot,
  faPen,
  faUserGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const RightSidebar = ({ userInfor, isCollapsed, toggleCollapse }) => {
  if (!userInfor) return null;

  return (
    <div
      className={` fixed  right-4 h-full l transition-all duration-150 ease-in-out bg-bg-pf text-white p-4  rounded-lg ${
        isCollapsed ? "w-[6%]" : "w-[26%]"
      }`}
    >
      {/* Back Button */}
      <div
        className={`flex   ${isCollapsed ? "justify-center" : "justify-end"}`}
      >
        <button
          onClick={toggleCollapse}
          className="text-gray-400 hover:text-white text-xl"
        >
          {isCollapsed ? (
            <FontAwesomeIcon icon={faArrowLeft} />
          ) : (
            <FontAwesomeIcon icon={faArrowRight} />
          )}
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={userInfor.profilePicture}
          alt={userInfor.name}
          className={`rounded-full    ${isCollapsed ? "w-8 h-8" : "w-40 h-40"}`}
        />
        {!isCollapsed && (
          <h2 className="text-3xl font-black"> {userInfor.name} </h2>
        )}
        {!isCollapsed && (
          <p className="text-lg font-nomal text-gray-400">
            {userInfor.headline}
          </p>
        )}
      </div>

      {/* Location */}
      {!isCollapsed && (
        <div className="flex items-center text-sm mb-8  ">
          <FontAwesomeIcon className="mr-2" icon={faLocationDot} />
          <p className=" text-gray-400">
            {userInfor.city}, {userInfor.country}
          </p>
        </div>
      )}

      {/* Edit Profile Button */}
      <div
        className={` flex justify-center items-center mb-4 bg-gray-700 text-white  rounded-md ${
          isCollapsed ? " h-10 w-full] " : "w-full py-1"
        }`}
        onClick={() => {
          window.location.href = "/edit-profile";
        }}
      >
        <button>
          <FontAwesomeIcon icon={faPen} />
        </button>
        {!isCollapsed && <p>Edit Profile</p>}
      </div>

      {/* contact */}
      {!isCollapsed && (
        <div className="flex flex-col items-start mt-6 space-y-4">
          <div className="flex-col items-start ">
            <p className="text-lg mb-3 text-gray-300">Contact/Email Address</p>
            <p className="text-base text-gray-400">{userInfor.email}</p>
          </div>
        </div>
      )}

      {/* Other Information */}
      <div
        className={`flex flex-col justify-center mt-8  space-y-4 ${
          !isCollapsed ? "items-start" : "items-center"
        } `}
      >
        {!isCollapsed ? (
          <div>
            <div className="">
              <p>{userInfor.followersCount} Fllowers</p>
            </div>
            <div className=" ">
              <p>{userInfor.followingCount} Following</p>
            </div>
          </div>
        ) : (
          <div>
            <div className=" flex flex-col justify-center items-center mb-4">
              <FontAwesomeIcon className="mb-1" icon={faUserGroup} />
              <p>{userInfor.followersCount} </p>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <FontAwesomeIcon className="mb-1" icon={faUser} />
              <p>{userInfor.followingCount} </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
