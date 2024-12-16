import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getOwnJobs } from "../store/slices/jobSlice";
import { Link } from "react-router-dom";
import { Pencil, Trash, ContactRound } from "lucide-react";
import { deleteJob } from "../store/slices/jobSlice";

import { useState } from "react";

const OwnerJob = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.job);

  const jobs = useSelector((state) => state.job.jobs);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    if (userId) {
      dispatch(getOwnJobs());
    }
  }, [dispatch, userId]);

  const handleDelete = async (jobId) => {
    await dispatch(deleteJob(jobId));
    await dispatch(getOwnJobs());
  };

  return (
    <div className="bg-bg-pf w-full mx-2 rounded-md">
      <div className="w-full pl-6 py-8 bg-gray-600 rounded-t-sm flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Jobs</h1>
          <p className="text-gray-400 ">
            The jobs you are looking for partners
          </p>
        </div>

        <Link
          to="new"
          className="rounded-md bg-blue-500 hover:bg-blue-700 mr-8 "
        >
          Posting new Job
        </Link>
      </div>
      <div className="px-4">
        <div className="mt-2 flow-root ">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              {jobs && jobs.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                   
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-0"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                      >
                        Candidates
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                      >
                        View Count
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                      >
                        Deadline
                      </th>{" "}
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                      >
                        Recruitments
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">HEHE</span>
                      </th>
                   
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jobs?.map((app) => (
                      <tr key={app._id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {app.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {app.status}
                        </td>{" "}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {app.recruitmentCount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {app.viewCount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {app.expiresAt
                            ? new Date(app.expiresAt)
                                .toISOString()
                                .split("T")[0]
                            : ""}
                        </td>
                        <td>
                          <div>
                            <Link
                              to={`/job_manage/job_posting/recruitment/${app._id}`}
                              className="pr-4 text-gray-400 m-0 px-10 hover:text-gray-200"
                            >
                              <ContactRound />
                            </Link>
                          </div>
                        </td>
                        <td className="flex whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Link
                            to={`/job_manage/job_posting/${app._id}`}
                            className="pr-4 text-gray-400 m-0 p-0 hover:text-gray-200"
                          >
                            <Pencil />
                          </Link>

                          <button
                            onClick={() => handleDelete(app._id)}
                            className="pr-4 text-red-800 m-0 p-0 hover:text-red-400"
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-6 text-gray-400">You don't have any jobs.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OwnerJob;
