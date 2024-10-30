import React from "react";
import { MapPinIcon, BookmarkIcon } from "lucide-react";

import { formatPostDate } from "../../lib/date";
import { useDispatch } from "react-redux";
import { fetchJobById } from "../../store/slices/jobSlice";

const JobCard = ({ job }) => {
  const dispatch = useDispatch();

  const goToDetail = () => {
    dispatch(fetchJobById(job._id));
    const newWindow = window.open(
      `/job/${job._id}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  // console.log("job", job.posterBy.profilePicture  );

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4" onClick={goToDetail}>
      <div className="flex justify-between items-center">
        <div className=" mt-4 ml-4">
          <div className="flex items-center ">
            <div className="flex items-center  ">
              {job.posterType === "studio" ? (
                  <img
                  src={
                    job.studioId && job.studioId.studioProfileImage
                      ? job.studioId.studioProfileImage
                      : "https://via.placeholder.com/150"
                  }
                  alt={job.company}
                  className="w-16 h-16 rounded-full aspect-square object-cover "
                />
              ):(
                <img
                  src={
                    job.posterBy.profilePicture
                      ? job.posterBy.profilePicture
                      : "https://via.placeholder.com/150"
                  }
                  alt={job.company}
                  className="w-16 h-16 rounded-full aspect-square object-cover "
                />
              )}
            
              <div className="mx-4 mb-4">
                <h2 className="font-bold">{job.title}</h2>
                <p className="text-gray-400">{job.company}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2  ">
              <div className="bg-bg-pf rounded-full p-2">
                <div
                  key={job.location}
                  className="flex items-center text-gray-400 text-sm"
                >
                  <MapPinIcon size={16} className="mr-1" />
                  {job.location}
                </div>
              </div>

              <div className="bg-bg-pf rounded-full p-2">
                <div
                  key={job.employmentType}
                  className="flex items-center text-gray-400 text-sm"
                >
                  {job.employmentType}
                </div>
              </div>

              <div className="bg-bg-pf rounded-full p-2">
                <div
                  key={job.experienceLevel}
                  className="flex items-center text-gray-400 text-sm"
                >
                  <MapPinIcon size={16} className="mr-1" />
                  {job.experienceLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BookmarkIcon className="text-gray-400" size={20} />
      </div>

      <div className="mt-4 text-right text-sm text-gray-400">
        Posted {formatPostDate(job.createdAt)}
      </div>
    </div>
  );
};

export default JobCard;
