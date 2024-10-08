import React from 'react';
import { Globe, Briefcase, MapPin, X } from 'lucide-react';

const JobCard = ({ logo, title, company, isRemote, jobType, locations, salary, postedDate }) => (
  <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center">
        <img src={logo} alt={company} className="w-12 h-12 rounded-full mr-3" />
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400">{company}</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-white">
        <X size={20} />
      </button>
    </div>
    <div className="flex flex-wrap gap-2 mb-3">
      {isRemote && (
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm flex items-center">
          <Globe size={14} className="mr-1" /> Remote
        </span>
      )}
      <span className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm flex items-center">
        <Briefcase size={14} className="mr-1" /> {jobType}
      </span>
      {locations && locations.map((location, index) => (
        <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm flex items-center">
          <MapPin size={14} className="mr-1" /> {location}
        </span>
      ))}
    </div>
    {salary && <p className="text-white mb-2">{salary}</p>}
    <p className="text-gray-400 text-sm mt-auto">Posted {postedDate}</p>
  </div>
);

const SavedJobsListing = () => {
  const savedJobs = [
    {
      logo: "/api/placeholder/50/50",
      title: "UI/UX Freelancer",
      company: "Transcend Studios",
      isRemote: true,
      jobType: "Freelance",
      salary: "USD $699 - 2.0K / month",
      postedDate: "8 October"
    },
    {
      logo: "/api/placeholder/50/50",
      title: "3D Animator (First Person Shooter)",
      company: "TransPerfect Gaming",
      isRemote: true,
      jobType: "Contract",
      locations: ["Atlanta, GA, USA", "New York, NY, USA"],
      postedDate: "9 October"
    }
  ];

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-1">Saved Jobs <span className="text-gray-400 text-xl">{savedJobs.length} results</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {savedJobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default SavedJobsListing;