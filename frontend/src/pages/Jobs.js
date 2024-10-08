import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchIcon, MapPinIcon, BookmarkIcon } from "lucide-react";
import JobFilters from "../components/Job/JobFilters";
import JobCard from "../components/Job/JobCard";

const JobBoard = () => {
  // const jobs = useSelector((state) => state.jobs.list);
  const jobs = [
    {
      id: 1,
      title: "Manga/Graphic Novel Artist (Remote)",
      company: "MrSuicideSheep",
      companyLogo: "https://via.placeholder.com/150",
      tags: ["Remote", "Freelance"],
      locations: [
        "Tokyo, Tokyo, Japan",
        "London, ENG, UK",
        "Vancouver, BC, Canada",
      ],
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
      <main className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Jobs{" "}
            <span className="text-sm font-normal text-gray-400">
              192 results
            </span>
          </h1>
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
            <JobFilters />
          </div>
        </div>
      </main>
    </div>
  );
};


export default JobBoard;
