import React from "react";
import { Link, useParams } from "react-router-dom";
import { Pencil, Trash, ContactRound } from "lucide-react";
import { deleteJob } from "../store/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getRecruitmentByJob } from "../store/slices/recruitmentSlice";

const RecruimentByJob = () => {
  const jobId = useParams().jobId;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.job);
  const jobs = useSelector((state) => state.recruitment.recruitmentByJob);
  const recruitmentByJob = useSelector(
    (state) => state.recruitment.recruitmentByJob
  );

  useEffect(() => {
    dispatch(getRecruitmentByJob(jobId));
  }, [dispatch, jobId]);

  return (
    <div className="bg-bg-pf w-full mx-2 rounded-md">
      <div className="w-full pl-6 py-8 bg-gray-600 rounded-t-sm flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Recruiment</h1>
          <p className="text-gray-400 ">Candidates apply for jobs</p>
        </div>
      </div>
      <div className="px-4">
        <div className="mt-2 flow-root ">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              {jobs && jobs.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-0"
                      >
                        Name
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
                        Apply At
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                      >
                        Interview Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recruitmentByJob.map((app) => (
                      <tr key={app._id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {app.applicant.name || app.applicant.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {app.status}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {app.createdAt
                            ? new Date(app.createdAt)
                                .toISOString()
                                .split("T")[0]
                            : ""}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {app.interviews.confirmed ? "Confirmed" : "Pending"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex items-center">
                          <div className="flex items-center">
                            <Link
                              to={`/job_manage/applicant/${app._id}`}
                              className="pr-4 text-gray-400 m-0 p-0 hover:text-gray-200"
                            >
                              <Pencil />
                            </Link>
                          </div>
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

export default RecruimentByJob;
