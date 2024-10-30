
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../store/slices/jobSlice";
import { showNotification } from "../store/slices/notificationSlice";
import JobCard from "../components/Job/JobCard";
import JobFilters from "../components/Job/JobFilters";


const JobFreelace = () => {
  const dispatch = useDispatch();

  const jobsIndi = useSelector((state) => state.job.jobs);
  const jobs = jobsIndi.filter((job) => job.posterType === "artist");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllJobs()).unwrap(); // .unwrap() will throw an error if the thunk is rejected
      } catch (error) {
        console.log(error);
        dispatch(
          showNotification({
            type: "error",
            message: "Error fetching jobs",
          })
        );
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full">
      <main className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Jobs{" "}
            <span className="text-sm font-normal text-gray-400">
              {jobs.length} results
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
              <JobCard key={job._id} job={job} />
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

export default JobFreelace;
