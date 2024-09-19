import React, { useState, useEffect } from 'react';

const RightSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed  h-screen bg-gray-900 text-white p-4 ${
        isCollapsed ? 'w-[80px]' : 'w-[25%]'
      } transition-all duration-300`}
    >
      {/* Profile Information */}
      {!isCollapsed ? (
        <div>
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <img
              src="profile-picture-url" // Replace with actual profile picture URL
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-600"
            />
            {/* Name */}
            <h2 className="text-xl font-bold mt-4">Minh Nguyễn</h2>
            {/* Subtitle or Role */}
            <p className="text-gray-400">Hobb</p>
          </div>

          {/* Location */}
          <div className="mt-6 text-center">
            <p className="text-sm flex items-center justify-center">
              <span className="material-icons text-gray-400 mr-2">location_on</span>
              Hanoi, Vietnam
            </p>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6 flex justify-center">
            <button className="px-4 py-2 bg-gray-700 text-sm rounded hover:bg-gray-600 flex items-center">
              <span className="material-icons mr-2">edit</span> Edit profile
            </button>
          </div>

          {/* Additional Information */}
          <div className="mt-6">
            {/* About Info */}
            <p className="text-center text-gray-400">hobb</p>

            {/* Interested In */}
            <div className="mt-4 text-center">
              <p className="text-gray-400">Interested In</p>
              <button className="px-3 py-1 bg-gray-800 text-sm rounded mt-2">Full Time Employment</button>
            </div>

            {/* Contact Information */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">Contact / Email Address</p>
              <p className="mt-2">*********@email.com</p>
              <button className="text-blue-500 mt-2">Reveal email</button>
            </div>

            {/* Followers & Following */}
            <div className="mt-6 text-center">
              <p className="text-blue-500">0 Followers</p>
              <p className="text-blue-500 mt-2">0 Following</p>
            </div>

            {/* Help Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-500">ArtStation Help</p>
            </div>
          </div>

          {/* Collapse Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsCollapsed(true)}
              className="text-gray-400 text-2xl hover:text-white"
            >
              ➡️
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => setIsCollapsed(false)}
            className="text-gray-400 text-2xl hover:text-white"
          >
            ⬅️
          </button>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
