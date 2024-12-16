import React from "react";
import { NavLink } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { Briefcase, ArrowRight } from "lucide-react";

const JobNavBar = () => {
  return (
    <div className="flex-col w-full">
      <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
        {/* Background Image */}
        <img
          src="https://cdnb.artstation.com/p/assets/images/images/039/077/721/medium/le-vuong-untitled-2fsfsfds-copy.jpg?1624895466"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 p-8 flex flex-col justify-end">
          <h1 className="text-4xl font-bold text-white mb-2">Jobs</h1>
          <p className="text-xl text-gray-200 mb-6">
            Job listings you chose to bookmark.
          </p>

          <div className="flex space-x-4">
            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full flex items-center">
              <Briefcase className="mr-2" size={20} />
              Job Resources
            </button> */}
            {/* <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full flex items-center">
              Find Talent
              <ArrowRight className="ml-2" size={20} />
            </button> */}
          </div>
        </div>

        {/* Artist Attribution */}
        <div className="absolute top-2 right-2 text-white text-sm opacity-70">
          Artwork by Le Vuong
        </div>
      </div>
      <nav className="border-b border-gray-800 p-4 w-full">
        <ul className="flex justify-evenly">
          <li>
            <NavLink
              to="studios"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-blue-500" : ""
              }
            >
              Studios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="job-listings"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-blue-500" : ""
              }
            >
              Job Listing
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="saved-jobs"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-blue-500" : ""
              }
            >
              Saved Jobs
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="job-freelance"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-blue-500" : ""
              }
            >
              Individual Job
            </NavLink>
          </li>
          <li>
            <div className="lg:flex sm:hidden border-2 border-gray-border items-center rounded-full pl-6 mx-4 w-4/5 h-10">
              <FaSearch className="text-gray-color pr-1 text-2xl" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none text-gray-border outline-none w-full"
              />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default JobNavBar;
