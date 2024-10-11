import React, { useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { useState } from "react";
import { fetchAllJobs, setFilters } from "../../store/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const JobFilters = () => {
  const dispatch = useDispatch();

  const { filters } = useSelector((state) => state.job);

  const [locationExpanded, setLocationExpanded] = useState(true);
  const [jobTypeExpanded, setJobTypeExpanded] = useState(true);
  const [expertiseExpanded, setExpertiseExpanded] = useState(false);
  const [industryExpanded, setIndustryExpanded] = useState(false);

  const [jobTypes, setJobTypes] = useState([]);

  console.log(filters);
  useEffect(() => {
    dispatch(setFilters({ jobType: jobTypes }));
    dispatch(fetchAllJobs());
  }, [jobTypes, dispatch]);

  const toggleSection = (section) => {
    switch (section) {
      case "location":
        setLocationExpanded(!locationExpanded);
        break;
      case "jobType":
        setJobTypeExpanded(!jobTypeExpanded);
        break;
      case "expertise":
        setExpertiseExpanded(!expertiseExpanded);
        break;
      case "industry":
        setIndustryExpanded(!industryExpanded);
        break;
      default:
        break;
    }
  };

  const handJopbTypeChange = (e) => {
    console.log(e.target.id);
    if (e.target.checked) {
      setJobTypes([...jobTypes, e.target.id]);
    } else {
      setJobTypes(jobTypes.filter((type) => type !== e.target.id));
    }
  };
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="font-bold mb-4">Filters</h3>
      <div className="space-y-4">
        {/* Location Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("location")}
          >
            <h3 className="font-semibold">Location</h3>
            {locationExpanded ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          {locationExpanded && (
            <div className="mt-2 space-y-2">
              <input
                type="text"
                placeholder="City, Country, Continent"
                className="w-full bg-gray-800 p-2 rounded"
                // value={location}
                // onChange={(e) => setLocation(e.target.value)}
              />
              <label className="flex  items-center  ">
                <input
                  type="checkbox"
                  // checked={workRemotely}
                  // onChange={() => setWorkRemotely(!workRemotely)}
                  className="justify-start"
                />
                <span className="w-full">Work Remotely</span>
              </label>
              <label className="flex items-center ">
                <input
                  type="checkbox"
                  // checked={relocationAssistance}
                  // onChange={() => setRelocationAssistance(!relocationAssistance)}
                  className=""
                />
                <span className="w-full">Relocation Assistance</span>
              </label>
            </div>
          )}
        </div>

        {/* Job Type Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("jobType")}
          >
            <h3 className="font-semibold">Job Type</h3>
            {jobTypeExpanded ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          {jobTypeExpanded && (
            <fieldset className="mt-2 ">
              {/* <legend className="sr-only">Notifications</legend> */}
              <div className="space-y-1">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      onClick={handJopbTypeChange}
                      id="full-time"
                      type="checkbox"
                      aria-describedby="comments-description"
                      className="h-4 w-4 rounded border-gray-300 text-prime focus:ring-blue-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-white"
                    >
                      Full time
                    </label>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="remote"
                      type="checkbox"
                      aria-describedby="candidates-description"
                      className="h-4 w-4 rounded border-gray-300 text-prime focus:ring-blue-600"
                      onClick={handJopbTypeChange}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-white"
                    >
                      Remote
                    </label>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                    id="hybrid"
                      type="checkbox"
                      aria-describedby="offers-description"
                      className="h-4 w-4 rounded border-gray-300 text-prime focus:ring-blue-600"
                      onClick={handJopbTypeChange}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-white">
                      Hybrid
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          )}
        </div>

        {/* Level of Expertise Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("expertise")}
          >
            <h3 className="font-semibold">Level of Expertise</h3>
            {expertiseExpanded ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
        </div>

        {/* Industry Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("industry")}
          >
            <h3 className="font-semibold">Industry</h3>
            {industryExpanded ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
// export default function Example() {
//   return (
//     <fieldset>
//       <legend className="sr-only">Notifications</legend>
//       <div className="space-y-5">
//         <div className="relative flex items-start">
//           <div className="flex h-6 items-center">
//             <input
//               id="comments"
//               name="comments"
//               type="checkbox"
//               aria-describedby="comments-description"
//               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//             />
//           </div>
//           <div className="ml-3 text-sm leading-6">
//             <label htmlFor="comments" className="font-medium text-gray-900">
//               Comments
//             </label>
//             <p id="comments-description" className="text-gray-500">
//               Get notified when someones posts a comment on a posting.
//             </p>
//           </div>
//         </div>
//         <div className="relative flex items-start">
//           <div className="flex h-6 items-center">
//             <input
//               id="candidates"
//               name="candidates"
//               type="checkbox"
//               aria-describedby="candidates-description"
//               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//             />
//           </div>
//           <div className="ml-3 text-sm leading-6">
//             <label htmlFor="candidates" className="font-medium text-gray-900">
//               Candidates
//             </label>
//             <p id="candidates-description" className="text-gray-500">
//               Get notified when a candidate applies for a job.
//             </p>
//           </div>
//         </div>
//         <div className="relative flex items-start">
//           <div className="flex h-6 items-center">
//             <input
//               id="offers"
//               name="offers"
//               type="checkbox"
//               aria-describedby="offers-description"
//               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//             />
//           </div>
//           <div className="ml-3 text-sm leading-6">
//             <label htmlFor="offers" className="font-medium text-gray-900">
//               Offers
//             </label>
//             <p id="offers-description" className="text-gray-500">
//               Get notified when a candidate accepts or rejects an offer.
//             </p>
//           </div>
//         </div>
//       </div>
//     </fieldset>
//   )
// }
