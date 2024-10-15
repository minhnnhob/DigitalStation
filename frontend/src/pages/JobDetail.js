import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../store/slices/jobSlice";
import Loading from "../components/loading/Loading";

const DetailJob = () => {
  const dispatch = useDispatch();
  const selectedJob = useSelector((state) => state.job.selectedJob);
  const loading = useSelector((state) => state.job.loading);
  const { jobId } = useParams();
  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobById(jobId));
    }
  }, [dispatch, jobId]);

  if (loading) {
    return <Loading />;
  }

  if (!selectedJob) {
    return <div>Job not found</div>;
  }
  return (
    <div className="w-[80%] mx-auto p-4 text-white">
      Header Section
      <div className="bg-dark-900 p-6 rounded-lg shadow-md flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{selectedJob.title}</h1>
        <a
          href={`https://${selectedJob.studioId.website}`}
          className="text-blue-500"
        >
          {selectedJob.studioId.website}
        </a>
        <p className="text-lg">
          {selectedJob.salaryRange.min} - {selectedJob.salaryRange.max} /{" "}
          {selectedJob.salaryRange.currency} Monthly
        </p>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
            Apply
          </button>
          <button className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md">
            View all {selectedJob.company} jobs →
          </button>
        </div>
      </div>
      {/* Job Details */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {/* Left Column (Main Details) */}
        <div className="col-span-2 space-y-3">
          {/* Job Description */}
          <div className="  ">
            <h2 className="text-xl font-semibold">Job Description</h2>
            <p className="bg-bg-pf p-4 mt-4 rounded-xl">
              {selectedJob.description}
            </p>
          </div>

          {/* Skills  */}
          <div className="">
            <h2 className="text-xl font-semibold">Skills </h2>

            <p className="bg-bg-pf p-4 mt-4 rounded-xl">
              {selectedJob.skillsRequired.map((skill, index) => (
                <p key={index}>- {skill}</p>
              ))}
            </p>
          </div>

          {selectedJob.requiments ? (
            <div className="">
              <h2 className="text-xl font-semibold">Recruitment </h2>

              <p className="bg-bg-pf p-4 mt-4 rounded-xl">
                {selectedJob.requiments}
              </p>
            </div>
          ) : (
            ""
          )}

          {/* About the Company */}
          {selectedJob.studioId.description ? (
            <div className="">
              <h2 className="text-xl font-semibold">About the Company </h2>

              <p className="bg-bg-pf p-6 mt-4 rounded-xl space-y-8 text-justify">
                {selectedJob.studioId.description}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Right Column (Additional Info) */}
        <div className="col-span-1 space-y-6">
          {/* Job Information */}
          <div className="bg-dark-800 p-6 rounded-md ">
            <h2 className="text-lg font-semibold">Job Information</h2>
            <div className="flex flex-wrap space-x-2 space-y-2 mt-2  ">
              <div className="bg-gray-700 px-4 py-1 rounded-full text-sm">
                {selectedJob.experienceLevel}
              </div>
              <div className="bg-gray-700 px-3  rounded-full text-sm">
                {selectedJob.employmentType}
              </div>
              <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {selectedJob.location}
              </div>
            </div>
          </div>

          {/* Industry */}
          <div className="bg-dark-400 p-6 rounded-md">
            <h2 className="text-lg font-semibold">Industry</h2>
            <p className="bg-bg-pf p-6 mt-4 rounded-xl space-y-8 text-justify">
              {selectedJob.studioId.industry}
            </p>
          </div>

          {/* Medium */}
          {/* <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-lg font-semibold">Medium</h2>
            <p>{selectedJob.medium.join(", ")}</p>
          </div> */}

          {/* Tags */}
          {/* <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-lg font-semibold">Tags</h2>
            <p>{selectedJob.tags.join(", ")}</p>
          </div> */}
        </div>
      </div>{" "}
    </div>
  );
};

export default DetailJob;
