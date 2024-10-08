import React from "react";
import { MapPinIcon, BookmarkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    const newWindow = window.open(
      `/job/${job.id}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4" onClick={goToDetail}>
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

export default JobCard;
