import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchIcon, MapPinIcon, BookmarkIcon } from "lucide-react";

const JobBoard = () => {
  // const jobs = useSelector((state) => state.jobs.list);
  const jobs = [
    
      {
        id: 1,
        title: "Manga/Graphic Novel Artist (Remote)",
        company: "MrSuicideSheep",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Remote", "Freelance"],
        locations: ["Tokyo, Tokyo, Japan", "London, ENG, UK", "Vancouver, BC, Canada"],
        postedDate: "2 October",
      },
      {
        id: 2,
        title: "3D Character Artist",
        company: "World Makers",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Permanent"],
        locations: ["Cambridge, ENG, UK"],
        postedDate: "1 October",
      },
      {
        id: 3,
        title: "Freelance Artist",
        company: "Undisclosed",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Freelance", "Remote"],
        locations: ["Any Location"],
        postedDate: "30 September",
      },
      {
        id: 4,
        title: "3D Creator",
        company: "Sketchfab",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Full-time", "Remote"],
        locations: ["New York, NY, USA"],
        postedDate: "29 September",
      },
      {
        id: 5,
        title: "Lead Technical Artist",
        company: "GameCo",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Full-time", "On-site"],
        locations: ["Los Angeles, CA, USA"],
        postedDate: "28 September",
      },
      {
        id: 6,
        title: "3D Artist",
        company: "Sketchfab",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Contract", "Remote"],
        locations: ["Paris, France"],
        postedDate: "27 September",
      },
      {
        id: 7,
        title: "3D Character Modeler and Animator for Game Studio",
        company: "Indie Game Studio",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Freelance", "Remote"],
        locations: ["Berlin, Germany"],
        postedDate: "26 September",
      },
      {
        id: 8,
        title: "Rigging Artist",
        company: "Animation Studios",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Full-time", "On-site"],
        locations: ["Toronto, ON, Canada"],
        postedDate: "25 September",
      },
      {
        id: 9,
        title: "Marketing Designer 2D + 3D",
        company: "Tech Startup",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Full-time", "Remote"],
        locations: ["San Francisco, CA, USA"],
        postedDate: "24 September",
      },
      {
        id: 10,
        title: "Quick TCG Card Border Art",
        company: "The Online Creators",
        companyLogo: "https://via.placeholder.com/150",
        tags: ["Freelance", "Remote"],
        locations: ["Any Location"],
        postedDate: "23 September",
      },
  ];
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full">
      <nav className="border-b border-gray-800 p-4">
        <ul className="flex space-x-6">
          <li>Studios</li>
          <li className="border-b-2 border-blue-500">Job Listings</li>
          <li>Saved Jobs</li>
          <li>Job Preferences</li>
        </ul>
      </nav>

      <main className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Jobs{" "}
            <span className="text-sm font-normal text-gray-400">
              192 results
            </span>
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search in Jobs Listings"
              className="bg-gray-800 rounded-full py-2 px-4 pl-10 w-80"
            />
            <SearchIcon
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Job listings are presented to all users and were paid for by the
          advertiser unless otherwise noted in the job listing.
        </p>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div>
            <Filters />
          </div>
        </div>
      </main>
    </div>
  );
};

const JobCard = ({ job }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="font-bold">{job.title}</h2>
            <p className="text-gray-400">{job.company}</p>
          </div>
        </div>
        <BookmarkIcon className="text-gray-400" size={20} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-700 text-sm rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.locations.map((location) => (
          <div
            key={location}
            className="flex items-center text-gray-400 text-sm"
          >
            <MapPinIcon size={16} className="mr-1" />
            {location}
          </div>
        ))}
      </div>
      <div className="mt-4 text-right text-sm text-gray-400">
        Posted {job.postedDate}
      </div>
    </div>
  );
};

const Filters = () => {
  // Implement filters component
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="font-bold mb-4">Filters</h3>
      {/* Add filter options here */}
    </div>
  );
};

export default JobBoard;
