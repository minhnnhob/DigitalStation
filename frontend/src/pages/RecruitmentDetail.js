import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getRecruitmentById,
  updateRecruitment,
  scheduleInterview,
} from "../store/slices/recruitmentSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Mail,
  Phone,
  Cake,
  MapPinHouse,
  Pyramid,
  FileDown,
  Dot,
  Save,
  CalendarCheck,
} from "lucide-react";

import { formatPostDate } from "../lib/date";
import { useState } from "react";

const RecruitmentDetail = () => {
  const applicantId = useParams().applicantId;

  console.log(applicantId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recruitmentDetails = useSelector(
    (state) => state.recruitment.recruitmentDetails
  );

  const loading = useSelector((state) => state.recruitment.loading);

  useEffect(() => {
    if (applicantId) {
      dispatch(getRecruitmentById(applicantId));
    }
  }, [dispatch, applicantId]);
  console.log(recruitmentDetails?.interviews?.confirmed);

  const downloadResume = (url, name) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  const calculateWorkingTime = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(); // Use the current date if no end date

    // Calculate total years, months, and days difference
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Adjust if there are negative values
    if (days < 0) {
      months -= 1;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Convert days into weeks if days is 7 or more
    const weeks = Math.floor(days / 7);
    days = days % 7;

    // Build the output string
    const timeParts = [];
    if (years > 0) timeParts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) timeParts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (weeks > 0) timeParts.push(`${weeks} week${weeks > 1 ? "s" : ""}`);
    if (years === 0 && months === 0 && weeks === 0)
      timeParts.push(`${days} day${days > 1 ? "s" : ""}`);

    return timeParts.join(", ");
  };

  const [status, setStatus] = useState(recruitmentDetails?.status);

  useEffect(() => {
    setStatus(recruitmentDetails?.status);
  }, [recruitmentDetails?.status]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    dispatch(updateRecruitment({ _id: applicantId, status: status }));
  };

  const [interview, setInterview] = useState({
    date: "",
    type: "",
    note: "",
  });

  const handleInterviewChange = (e) => {
    console.log(e.target.value, e.target.name);
    setInterview({ ...interview, [e.target.name]: e.target.value });
  };
  console.log(interview);
  useEffect(() => {
    setInterview({
      date: recruitmentDetails?.interviews?.date,
      type: recruitmentDetails?.interviews?.type,
      note: recruitmentDetails?.interviews?.notes,
    });
  }, [dispatch]);

  const handleScheduleInterview = (e) => {
    e.preventDefault();
    dispatch(
      scheduleInterview({
        applicationId: applicantId,
        interviewData: interview,
      })
    );
  };

  const viewPortfolio = () => {
      navigate(`/portfolio/${recruitmentDetails?.applicant?._id}`);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" w-full">
      {/* Back Button */}
      <div
        className="flex items-center mb-8 text-white cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        <span>Back to Candidates</span>
      </div>

      <div className="w-full flex justify-between">
        <div className="w-[72%] h-[800px] space-y-4 ">
          {/* information */}
          <div className="flex items-center bg-bg-pf p-4 py-6 rounded-lg justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="min-w-16 min-h-16 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={recruitmentDetails?.applicant?.profilePicture}
                  alt="Profile"
                  className="w-16 h-16 object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold">
                    {recruitmentDetails?.applicant?.name}
                  </h1>
                  <span className="text-gray-500 text-sm">(24)</span>
                </div>
                <p className="text-gray-600">
                  {recruitmentDetails?.applicant?.headline}
                </p>
              </div>
            </div>
            <button onClick={viewPortfolio} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
              {/* <ExternalLink className="w-4 h-4" /> */}
              View Portfolio
            </button>
          </div>
          {recruitmentDetails?.coverLetter ? (
            <>
              {/* All info */}
              <div className=" bg-bg-pf p-4 rounded-lg">
                <h1 className="text-2xl font-semibold">Cover Letter</h1>
                <p className="text-white pt-4 break-words">
                  {recruitmentDetails?.coverLetter}
                </p>
              </div>
            </>
          ) : (
            ""
          )}

          {/* All infor */}
          <div className="w-full bg-bg-pf p-4 rounded-lg  ">
            <h1 className="text-2xl font-semibold pb-4">
              Personal Information
            </h1>
            <div className="grid grid-cols-2 gap-4 justify-between">
              <p className="flex items-center ">
                <Mail className="m-2" /> {recruitmentDetails?.applicant?.email}
              </p>
              <p className="flex items-center">
                <Phone className="m-2" />{" "}
                {recruitmentDetails?.applicant?.phone || "not provided"}
              </p>
              <p className="flex items-center">
                <Cake className="m-2 " />{" "}
                {recruitmentDetails?.applicant?.dob || "not provided"}
              </p>
              <p className="flex items-center">
                <MapPinHouse className="m-2" />{" "}
                {recruitmentDetails?.applicant?.country || "not provided"}
              </p>

              <hr className="col-span-2" />

              <p className="flex items-center">
                <Pyramid className="m-2" />{" "}
                <div className="">
                  {recruitmentDetails?.applicant?.hiring
                    ? Array.isArray(recruitmentDetails.applicant.hiring)
                      ? recruitmentDetails.applicant.hiring.join(", ")
                      : recruitmentDetails.applicant.hiring
                    : "not provided"}

                  <div>
                    <p className="text-xs text-gray-500"> Work Type</p>
                  </div>
                </div>
              </p>
            </div>
          </div>
          {recruitmentDetails?.applicant.proSumarry ? (
            <>
              {/*Pro Sumarry */}
              <div className="w-full bg-bg-pf p-4 rounded-lg">
                <h1 className="text-2xl font-semibold">Cover Letter</h1>
                <p className="text-white pt-4">
                  {recruitmentDetails?.applicant.proSumarry}
                </p>
              </div>
            </>
          ) : (
            ""
          )}

          {/* Resume */}
          <>
            {/*Pro Sumarry */}
            <div className="w-full bg-bg-pf p-4 rounded-lg">
              <h1 className="text-2xl font-semibold">Cover Letter</h1>
              <div className="flex justify-between items-center pt-4">
                <a
                  href={recruitmentDetails?.resumeVersion.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  <p className="text-white ">
                    {recruitmentDetails?.resumeVersion.originalName ||
                      "not provided"}
                  </p>
                </a>
                {/* button */}
                <div>
                  <button
                    onClick={() =>
                      downloadResume(
                        recruitmentDetails?.resumeVersion.url,
                        recruitmentDetails?.resumeVersion.originalName
                      )
                    }
                    className="flex px-3  py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <FileDown size={20} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </>

          <div className="w-full bg-bg-pf p-6 rounded-lg">
            <h1 className="text-2xl font-semibold">Experience</h1>
            <div className="space-y-8">
              {recruitmentDetails?.applicant?.experience?.length > 0 ? (
                recruitmentDetails.applicant.experience.map(
                  (experience, index) => (
                    <div key={index} className=" ">
                      <h2 className="text-xl font-medium">
                        Company: {experience.company}
                      </h2>
                      <div className=" items-center">
                        <p className="text-gray-500 text-sm">
                          Title: {experience.title}
                        </p>
                        <div className="text-gray-500 text-sm flex">
                          Time:{"  "}
                          <span>
                            {calculateWorkingTime(
                              experience.startDate,
                              experience.endDate
                            )}
                          </span>
                          {""}
                          <Dot />
                          {formatPostDate(experience.startDate)} ,
                          {formatPostDate(experience.endDate)}
                        </div>
                      </div>

                      <p>Description {experience.description}</p>

                      {index !==
                      recruitmentDetails?.applicant?.experience?.length - 1 ? (
                        <hr className="mt-6" />
                      ) : (
                        ""
                      )}
                    </div>
                  )
                )
              ) : (
                <p>No experience provided</p>
              )}
            </div>
          </div>
          {recruitmentDetails?.applicant?.skills?.length > 0 ? (
            <>
              {/* Skills */}
              <div className="w-full bg-bg-pf p-4 rounded-lg">
                <h1 className="text-2xl font-semibold">Skills</h1>
                <div className="flex flex-wrap gap-2">
                  {recruitmentDetails?.applicant?.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        {/* Application Status */}
        <div className="w-[25%] space-y-4  ">
          <div className="w-full bg-bg-pf p-4 rounded-lg">
            <h1 className="text-2xl font-semibold">Status</h1>
            <div className="flex items-center justify-between mt-4">
              <select
                className=" bg-bg-pf rounded-lg"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Short List</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
              <button
                type=""
                className="flex items-center  bg-blue-600 text-white p-2 "
                onClick={handleSaveStatus}
              >
                <Save className="mx-1" size={18} /> Save
              </button>
            </div>
          </div>

          {/* schedule Interview */}
          <>
            {/*Pro Sumarry */}
            <div className="w-full bg-bg-pf p-4 rounded-lg space-y-4">
              <div className="flex gap-8 items-center">
                <h1 className="text-2xl font-semibold">Schedule Interview</h1>
                <h3 className="">{recruitmentDetails?.interviews?.confirmed ? "Confirmed": "Not Confirmed"}</h3>
              </div>
              <div>
                <input
                  type="date"
                  name="date"
                  value={interview?.date?.toString().split("T")[0]}
                  className=" bg-bg-pf rounded-md"
                  style={{ colorScheme: "dark" }}
                  onChange={handleInterviewChange}
                />
              </div>
              <div>
                <textarea
                  name="note"
                  value={interview.note}
                  onChange={handleInterviewChange}
                  className="bg-bg-pf w-full p-2 border rounded-md min-h-[100px]"
                  placeholder="Add a note"
                />
              </div>
              <div className="flex justify-between w-full">
                <div className="w-[45%]">
                  <select
                    className=" w-full bg-bg-pf rounded-lg"
                    value={interview?.type}
                    name="type"
                    onChange={handleInterviewChange}
                  >
                    <option value="phone">Phone</option>
                    <option value="video">Video</option>
                    <option value="inPerson">In Person</option>
                  </select>
                </div>

                <div className="w-[45%] flex justify-end">
                  <button
                    className="w-full justify-center flex items-center  bg-blue-600 text-white p-2 rounded-lg "
                    onClick={handleScheduleInterview}
                  >
                    <CalendarCheck className="mr-1" size={18} /> Schedule
                  </button>
                </div>
              </div>
            </div>
          </>

          <></>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDetail;
