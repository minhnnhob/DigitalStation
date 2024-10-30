import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById } from "../store/slices/jobSlice";
// import { updateJob } from "../store/slices/recruitmentSlice";
import InforInput from "../components/input/inforInput";
import TextArea from "../components/input/textArea";
import { updateJob } from "../store/slices/jobSlice";

const UpdateOwnerJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.job);
  const selectedJob = useSelector((state) => state.job.selectedJob);
  console.log("selectedJob", loading);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiments: "",
    location: "",
    employmentType: "",
    skillsRequired: [],
    experienceLevel: "",
    budget: "",
    expiresAt: "",
    currency: "",
    maxApplicants: "",
  });

  useEffect(() => {
    dispatch(fetchJobById(jobId));
  }, [jobId, dispatch]);

  useEffect(() => {
    if (selectedJob) {
      setFormData({
        title: selectedJob.title || "",
        description: selectedJob.description || "",
        requiments: selectedJob.requiments || "",
        location: selectedJob.location || "",
        employmentType: selectedJob.employmentType || "",
        skillsRequired: selectedJob.skillsRequired || [],
        experienceLevel: selectedJob.experienceLevel || "",
        budget: selectedJob.budget || "",
        expiresAt: selectedJob.expiresAt
          ? new Date(selectedJob.expiresAt).toISOString().split("T")[0]
          : "",
      });
    }
  }, [selectedJob, jobId, dispatch]);

  const handleChange = (e) => {
    console.log("e.target", e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [skills, setSkills] = useState(selectedJob?.skillsRequired || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, skillsRequired: skills }));
  }, [skills]);

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateJob({ jobId, jobData: formData })).unwrap();
      // navigate("/job_manage/job_posting");
    } catch (err) {
      console.error("Failed to update job:", err);
    }
    await dispatch(fetchJobById(jobId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-4 bg-bg-pf rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Job Posting</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-bg-pf w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-bg-pf w-full p-2 border rounded-md min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Requiments</label>
          <textarea
            name="requiments"
            value={formData.requiments}
            onChange={handleChange}
            className="bg-bg-pf w-full p-2 border rounded-md min-h-[100px]"
            required
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Skills Required</label>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  onClick={() => handleSkillRemove(skill)}
                  className="px-3 py-2 text-sm rounded border border-gray-600 bg-bg-pf text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new tag"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 p-2 bg-bg-pf border  rounded text-white"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddSkill();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-700 border border-gray-600 rounded text-white cursor-pointer  font-sans"
              >
                Add Skills
              </button>
            </div>
          </div>
        </div>

        {/* budget */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Budget</label>
          <div className="flex gap-2">
            {/* Amount Input */}
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="budget"
              className="bg-bg-pf flex-1 p-2 border rounded-md"
              required
            />

            {/* Currency Select */}
            <div>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="bg-bg-pf p-2 border rounded-md"
                required
              >
                <option value={formData.currency} disabled>
                  Select Currency
                </option>
                <option value="VND">VND</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>

                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* ///////////////// Locationn +Employtype*/}
        <div className="flex justify-between w-full gap-4 ">
          <div className="space-y-2 w-full">
            <label className="block text-sm font-medium">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="bg-bg-pf w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Location</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2 w-full ">
            <label className="block text-sm font-medium">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="bg-bg-pf w-full p-2 border rounded-md"
              required
            >
              <option value="">Select employment type</option>
              <option value="Freelance">Freelance</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between w-full gap-4">
          <div className="space-y-2 w-full">
            <label className="block text-sm font-medium">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="bg-bg-pf w-full p-2 border rounded-md"
              required
            >
              <option value="">Select experience level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior">Senior</option>
              <option value="Leader">Leader</option>
              <option value="Any">Any</option>
            </select>
          </div>

          <div className="space-y-2 w-full">
            <label className="block text-sm font-medium">Slot</label>
            <div className="flex gap-2">
              {/* Amount Input */}
              <input
                type="number"
                name="maxApplicants"
                value={formData.maxApplicants}
                onChange={handleChange}
                placeholder="If unlimited leave blank"
                className="bg-bg-pf flex-1 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Expiry Date</label>
          <input
            type="date"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            className="bg-bg-pf w-full p-2 border rounded-md"
            style={{ colorScheme: "dark" }}
            required
          />
        </div>

        <div className="flex gap-4 pt-4 ">
          <button
            type="submit"
            className="flex-1 font-sans bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Job"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="flex-1 font-sans bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOwnerJob;
