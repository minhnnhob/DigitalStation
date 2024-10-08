import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { useState } from "react";

const JobFilters = () => {
  const [locationExpanded, setLocationExpanded] = useState(true);
  const [jobTypeExpanded, setJobTypeExpanded] = useState(true);
  const [expertiseExpanded, setExpertiseExpanded] = useState(false);
  const [industryExpanded, setIndustryExpanded] = useState(false);

  const [location, setLocation] = useState("");
  const [workRemotely, setWorkRemotely] = useState(false);
  const [relocationAssistance, setRelocationAssistance] = useState(false);
  const [jobTypes, setJobTypes] = useState({
    permanent: false,
    contract: false,
    freelance: false,
    other: false,
  });

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

  const handleJobTypeChange = (type) => {
    setJobTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="font-bold mb-4">Filters</h3>
      <div className="space-y-4">
        {/* Location Section */}
        <div>
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('location')}>
            <h3 className="font-semibold">Location</h3>
            {locationExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {locationExpanded && (
            <div className="mt-2 space-y-2">
              <input
                type="text"
                placeholder="City, Country, Continent"
                className="w-full bg-gray-800 p-2 rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label className="flex  items-center  ">
                <input
                  type="checkbox"
                  checked={workRemotely}
                  onChange={() => setWorkRemotely(!workRemotely)}
                  className="justify-start"
                />
                <span className="w-full">Work Remotely</span>
              </label>
              <label className="flex items-center ">
                <input
                  type="checkbox"
                  checked={relocationAssistance}
                  onChange={() => setRelocationAssistance(!relocationAssistance)}
                  className=""
                />
                <span className="w-full">Relocation Assistance</span>
              </label>
            </div>
          )}
        </div>

        {/* Job Type Section */}
        <div>
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('jobType')}>
            <h3 className="font-semibold">Job Type</h3>
            {jobTypeExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {jobTypeExpanded && (
            <div className="mt-2 space-y-2">
              {Object.entries(jobTypes).map(([type, checked]) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleJobTypeChange(type)}
                    className="form-checkbox"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Level of Expertise Section */}
        <div>
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('expertise')}>
            <h3 className="font-semibold">Level of Expertise</h3>
            {expertiseExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>

        {/* Industry Section */}
        <div>
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('industry')}>
            <h3 className="font-semibold">Industry</h3>
            {industryExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
