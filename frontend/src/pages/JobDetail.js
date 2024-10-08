import React from "react";

const DetailJob = ({ job }) => {

    job = {
        id: 1,
        title: "UI/UX Freelancer",
        company: {
          name: "Transcend Studios",
          website: "www.operandvision.com",
        },
        salary: {
          min: 699,
          max: 2000,
          currency: "USD",
          period: "month",
        },
        jobDescription: "Stylized UI/UX Freelancing (Remote Work) \nFor mobile-gaming!",
        skillsRequirements: "Stylized UI/UX Freelancing (Remote Work) \nFor mobile-gaming!",
        howToApply: `Please DM me here on ArtStation \n
                      or at bogdan@operandvision.com \n
                      or bogdanotel@yahoo.com`,
        aboutCompany: `Intuition-based culture, rather than first principle thinking when creating our games. And vice versa when making it efficient. \n
                      Too much budget and too much time kill creativity. We are not fast-paced, but we also can't waste time on tasks that can be achieved more efficiently.`,
        instructions: ["Job Description", "Skills & Requirements", "How to Apply", "About the Company"],
        jobInfo: {
          level: "Middle",
          type: "Freelance",
          location: "Remote",
        },
        industry: "Games",
        medium: ["Digital 2D", "Digital 3D"],
        tags: ["UI/UX"],
    }
  return (
    <div className="max-w-screen-lg mx-auto p-4 text-white">
 {/* Header Section */}
 <div className="bg-dark-900 p-6 rounded-lg shadow-md flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <a href={`https://${job.company.website}`} className="text-blue-500">
          {job.company.website}
        </a>
        <p className="text-lg">
          {job.salary.currency} {job.salary.min} - {job.salary.max} / {job.salary.period}
        </p>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
            Apply
          </button>
          <button className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md">
            View all {job.company.name} jobs →
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {/* Left Column (Main Details) */}
        <div className="col-span-2 space-y-6">
          {/* Job Description */}
          <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-xl font-semibold">Job Description</h2>
            <p>{job.jobDescription}</p>
          </div>

          {/* Skills & Requirements */}
          <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-xl font-semibold">Skills & Requirements</h2>
            <p>{job.skillsRequirements}</p>
          </div>

          {/* How to Apply */}
          <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-xl font-semibold">How to Apply</h2>
            <p>{job.howToApply}</p>
          </div>

          {/* About the Company */}
          <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-xl font-semibold">About the Company</h2>
            <p>{job.aboutCompany}</p>
          </div>
        </div>

        {/* Right Column (Additional Info) */}
        <div className="col-span-1 space-y-6">
          {/* Instructions */}
          <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-lg font-semibold">Instructions</h2>
            <ul className="list-disc ml-5">
              {job.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>

          {/* Job Information */}
          <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-lg font-semibold">Job Information</h2>
            <div className="flex space-x-2">
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {job.jobInfo.level}
              </span>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {job.jobInfo.type}
              </span>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {job.jobInfo.location}
              </span>
            </div>
          </div>

          {/* Industry */}
          <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-lg font-semibold">Industry</h2>
            <p>{job.industry}</p>
          </div>

          {/* Medium */}
          <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-lg font-semibold">Medium</h2>
            <p>{job.medium.join(", ")}</p>
          </div>

          {/* Tags */}
          <div className="bg-dark-800 p-6 rounded-md">
            <h2 className="text-lg font-semibold">Tags</h2>
            <p>{job.tags.join(", ")}</p>
          </div>
        </div>
      </div>    </div>
  );
};

export default DetailJob;
