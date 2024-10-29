import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchIcon, MapPinIcon, BookmarkIcon } from "lucide-react";
import JobFilters from "../components/Job/JobFilters";
import JobCard from "../components/Job/JobCard";
import { useEffect } from "react";
import { fetchAllJobs } from "../store/slices/jobSlice";
import { showNotification } from "../store/slices/notificationSlice";

const JobBoard = () => {
  // const jobs = useSelector((state) => state.jobs.list);

  const dispatch = useDispatch();

  const jobsSudios = useSelector((state) => state.job.jobs);
  const jobs = jobsSudios.filter((job) => job.posterType === "studio");

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

export default JobBoard;
