import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnRecruitment } from "../store/slices/recruitmentSlice";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const JobApplication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOwnRecruitment());
  }, []);

  const applyDefaults = useSelector(
    (state) => state.recruitment?.applyDefaults
  );
  const loading = useSelector((state) => state.recruitment.loading);
  const error = useSelector((state) => state.recruitment.error);

  const dispatch = useDispatch();

  // const goToDetail = (recuitmentId) => {
  //   navigate(`/recruitment/${recuitmentId}`);
  // };

  if (!Array.isArray(applyDefaults)) {
    return <div>No applications found.</div>;
  }

  return (
    <div className="w-full bg-bg-pf ml-2 py-4 rounded-sm">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-white">
              Job Applications
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              A list of all the job you applications.
            </p>
          </div>
          {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div> */}
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-0"
                    >
                      Studio/co-worker
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                    >
                      Application status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                    >
                      Job Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">HEHE</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applyDefaults.map((app) => (
                    <tr key={app._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0">
                        {app.job.studioId?.name || app.job.posterBy?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {app.job.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {app.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {app.job.status}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        {/* <Link
                          to={`recruitment/job/${app.job._id}`}
                          className="text-blue-500 hover:text-blue-400">View</Link> */}
                        <Link
                          to={`${app._id}`}
                          className="pr-4 text-blue-500 m-0 p-0 hover:text-blue-400"
                          // onClick={() => goToDetail(app._id)}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
