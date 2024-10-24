import React, { useEffect, useState } from "react";
import LineSpace from "../components/line/lineSpace";
import InforInput from "../components/input/inforInput";
import TextArea from "../components/input/textArea";
import Select from "react-select";
import DatePicker from "../components/Date/DatePicker";
import CountryPicker from "../components/location/CountryPicker";
import CityPicker from "../components/location/CityPicker";
import { Save, X, Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  showNotification,
  hideNotification,
} from "../store/slices/notificationSlice";
import { updateUser } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import { fetchUserInfo } from "../store/slices/userSlice";
import { Link } from "react-router-dom";

const Recuitment = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userInfor = user.userInfor;

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const [hiring, setHiring] = useState([]);
  const [proSummary, setProSummary] = useState("");

  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // experience
  const [isExperinceOpen, setIsExperinceOpen] = useState(false);
  const [experience, setExperience] = useState({
    company: "",
    title: "",
    country: "",
    city: "",
    startDate: new Date(),
    endDate: new Date(),
    currentlyWorking: false,
    description: "",
  });

  const [experiences, setExperiences] = useState([]);

  //hiring
  const handleHiringChange = (e) => {
    const { value, checked } = e.target;
    // console.log("Value:", value);
    if (checked) {
      setHiring([...hiring, value]);
    } else {
      setHiring(hiring.filter((item) => item !== value));
    }
  };
  // professional summary
  const handleProSummaryChange = (e) => {
    setProSummary(e.target.value);
  };
  //skills
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // experience

  const handleEditExperience = (experienceIndex) => {
    const experienceToEdit = experiences[experienceIndex];
    setExperience(experienceToEdit); // Load the experience into the form
    setIsExperinceOpen(true); // Open the form for editing
  };

  const handleDeleteExperience = (experienceIndex) => {
    const updatedExperiences = experiences.filter(
      (_, index) => index !== experienceIndex
    );
    setExperiences(updatedExperiences);
    console.log("Delete Experience:", updatedExperiences);
  };

  useEffect(() => {
    if (experience.currentlyWorking) {
      setExperience({ ...experience, endDate: null });
    }

    if (
      experience.startDate > experience.endDate &&
      !experience.currentlyWorking
    ) {
      handleExperienceChange("endDate", experience.startDate);
    }
  }, [experience.startDate, experience.endDate]);

  const toggleExperienceForm = () => {
    setIsExperinceOpen(!isExperinceOpen); // Toggle form visibility
  };

  const handleCheckbox = () => {
    setExperience({
      ...experience,
      currentlyWorking: !experience.currentlyWorking,
    });
  };

  const handleExperienceChange = (field, value) => {
    setExperience({ ...experience, [field]: value });
  };

  const handleAddExperience = () => {
    const newExperience = experience;
    console.log("New Experience:", newExperience);
    //validation
    if (
      !newExperience.company ||
      !newExperience.title ||
      !newExperience.country ||
      !newExperience.startDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setExperiences([...experiences, newExperience]);

    setExperience({
      company: "",
      title: "",
      country: "",
      city: "",
      startDate: new Date(),
      endDate: new Date(),
      currentlyWorking: false,
      description: "",
    });
    setIsExperinceOpen(false);
  };

  const handleExprienceCancel = () => {
    setExperience({
      company: "",
      title: "",
      country: "",
      city: "",
      startDate: new Date(),
      endDate: new Date(),
      currentlyWorking: false,
      description: "",
    });

    setIsExperinceOpen(false); // Close form on cancel
  };

  useEffect(() => {
    if (userInfor) {
      setHiring(userInfor.hiring || []);
      setProSummary(userInfor.proSumarry || "");
      setSkills(userInfor.skills || []);
      setResumeFile(userInfor.resume || null);
      setExperiences(userInfor.experience || []);
    }
  }, [userInfor]);

  // console.log("User:", userInfor.skills);
  // console.log("User:", experiences);

  // ////////////////////////////////////////////////////////////////////
  const handleSave = async (e) => {
    e.preventDefault();

    console.log("User:", experiences);

    // Handle save logic here
    const formData = new FormData();
    hiring.forEach((item, index) => {
      formData.append(`hiring[${index}]`, item);
    });
    formData.append("proSumarry", proSummary);
    formData.append("resume", resumeFile);

    if (skills.length > 0) {
      skills.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill);
      });
    } else {
      formData.append("skills", []);
    }

    if (experiences.length > 0) {
      experiences.forEach((exp, index) => {
        for (const key in exp) {
          formData.append(`experience[${index}][${key}]`, exp[key]);
        }
      });
    } else {
      formData.append("experience", []);
    }

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/users`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("User updated successfully");
        dispatch(updateUser(response.data));
        dispatch(
          showNotification({
            type: "success",
            message: "Profile updated successfully",
          })
        );
        setTimeout(() => {
          dispatch(hideNotification());
        }, 3000);
      }
    } catch (error) {
      dispatch(
        showNotification({ type: "error", message: "Profile update failed" })
      );
      setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
    }

    console.log("Save resume");
  };

  if (user.loading) {
    return <Loading />;
  }

  return (
    <div className="w-full  ml-2 px-6 rounded-sm ">
      <div className="w-full pl-6 py-8 bg-gray-600 rounded-t-sm">
        <h1 className="text-3xl font-bold">Resume</h1>
        <p className="text-gray-400 ">Your resume on Digital Station</p>
      </div>
      <div className=" bg-bg-pf px-6 py-4  w-full ">
        <div className="flex justify-between items-center ">
          {/* <button className="bg-gray-800 text-blue-400 px-3 py-1 rounded-md text-sm flex items-center">
            View profile
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button> */}
        </div>
        {/* Hirring Section */}
        <h2 className="text-xl font-semibold mb-4">Hiring</h2>
        <p className="text-gray-400 mb-2">Interested in:</p>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Full-time employment"
              className="form-checkbox text-blue-500 rounded bg-gray-700 border-gray-600 focus:ring-blue-500"
              checked={hiring.includes("Full-time employment")}
              onChange={handleHiringChange}
            />
            <span className="ml-2">Full-time employment</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value={"Contract"}
              className="form-checkbox text-blue-500 rounded bg-gray-700 border-gray-600 focus:ring-blue-500"
              checked={hiring.includes("Contract")}
              onChange={handleHiringChange}
            />
            <span className="ml-2">Contract</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value={"Freelance"}
              checked={hiring.includes("Freelance")}
              onChange={handleHiringChange}
              className="form-checkbox text-blue-500 rounded bg-gray-700 border-gray-600 focus:ring-blue-500"
            />
            <span className="ml-2">Freelance</span>
          </label>
        </div>
        {/* //////////////////////////////////////////////////////////////////// */}
        <LineSpace /> {/* Profestion Sumarry */}
        <h2 className="text-xl font-semibold  mb-4">Professional Summary</h2>
        <div className="mb-8">
          {/* <InforInput type /> */}
          <TextArea
            label={"Summary"}
            value={proSummary}
            onChange={handleProSummaryChange}
          />
        </div>
        <LineSpace />{" "}
        {/* Réume ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <h2 className="text-xl font-semibold  mb-4">Resume</h2>
        {resumeFile ? (
          <Link to={`${resumeFile}`} target="_blank" className="mb-6">
            Resume: {userInfor.resumeName}
          </Link>
        ) : (
          ""
        )}
        <div className="rounded-md border border-gray-500 p-4 mb-8">
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md   file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <LineSpace />{" "}
        {/* Skills ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <h2 className="text-xl font-semibold  mb-4">Skills</h2>
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">
            Add skills and proficiencies so that employers can search for you.
            E.g. "Concept Art", "3D Modeling", etc.
          </p>
          <p className="text-sm mb-2 text-yellow-600">
            Warning: Skills should not be duplicated
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill) => (
              <span
                key={skill}
                onClick={() => handleSkillRemove(skill)}
                className="px-3 py-2 text-sm rounded border border-gray-600 bg-gray-700 text-white"
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
              className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddSkill();
                }
              }}
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white cursor-pointer"
            >
              Add Skills
            </button>
          </div>
        </div>
        <LineSpace />{" "}
        {/* Expẻince ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Professional Experience
          </h2>

          <div className="mt-4 flex w-full">
            {experiences.map((exp, experienceIndex) => (
              <div
                key={experienceIndex}
                className="mb-4 p-4 border border-gray-500 rounded w-full flex items-center gap-4 justify-between overflow-hidden"
              >
                <h3 className="text-lg font-bold">{exp.title}</h3>
                <p className="text-sm text-gray-400">{exp.company}</p>
                <p className="text-sm text-gray-400">
                  {exp.city}, {exp.country}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(exp.startDate).toDateString()} -{" "}
                  {exp.currentlyWorking
                    ? "Present"
                    : new Date(exp.endDate).toDateString()}
                </p>
                <p className="text-sm">{exp.description}</p>

                {/* Edit and Delete buttons */}
                <div className="flex space-x-4 mt-2  ">
                  <button
                    onClick={() => handleEditExperience(experienceIndex)}
                    className="text-white px-4 py-2 rounded items-center"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(experienceIndex)}
                    className=" flex-col justify-center text-white px-4 py-2 rounded "
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Toggle form visibility on button click */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mb-8 flex items-center my-8"
            onClick={toggleExperienceForm}
          >
            <span className="mr-2">+</span> Add Position
          </button>

          {/* Form is only visible when isOpen is true */}
          {isExperinceOpen && (
            <div>
              <div className="mb-4">
                <InforInput
                  label={"*Company"}
                  type="text"
                  id="company"
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company"
                  value={experience.company}
                  onChange={(e) =>
                    handleExperienceChange("company", e.target.value)
                  }
                />
              </div>

              <div className="mb-4">
                <InforInput
                  label={"* Title"}
                  type="text"
                  id="title"
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Title"
                  value={experience.title}
                  onChange={(e) =>
                    handleExperienceChange("title", e.target.value)
                  }
                />
              </div>

              <div className="mb-4">
                <CountryPicker
                  id="country"
                  value={experience.country}
                  onChange={(e) => {
                    handleExperienceChange("country", e);
                  }}
                />
              </div>

              <div className="mb-4">
                <CityPicker
                  id="city"
                  country={experience.country}
                  value={experience.city}
                  onChange={(e) => handleExperienceChange("city", e)}
                  disabled={!experience.country}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white text-sm mb-2">
                  * Time Period
                </label>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    {/* Start Date Picker */}
                    <DatePicker
                      id="startDate"
                      initialDate={experience.startDate}
                      onDateChange={(e) =>
                        handleExperienceChange("startDate", e)
                      }
                    />
                  </div>
                  {!experience.currentlyWorking && (
                    <>
                      <div className="w-1/2">
                        {/* End Date Picker */}{" "}
                        <DatePicker
                          id="endDate"
                          initialDate={experience.endDate}
                          onDateChange={(e) =>
                            handleExperienceChange("endDate", e)
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-2">
                  <label className="text-white text-sm">
                    <input
                      type="checkbox"
                      checked={experience.currentlyWorking}
                      onChange={handleCheckbox}
                      className="mr-2"
                    />
                    I currently work here
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <TextArea
                  label={"Description"}
                  id="description"
                  onChange={(e) =>
                    handleExperienceChange("description", e.target.value)
                  }
                />
              </div>

              <div className="flex justify-start gap-6">
                <button
                  onClick={handleAddExperience}
                  className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </button>
                <button
                  onClick={handleExprienceCancel}
                  className="flex items-center bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>{" "}
        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <LineSpace />{" "}
        {/* Save All /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
      </div>
      <button
        onClick={handleSave}
        className="flex items-center ml-0 bg-blue-500 my-8 py-4 text-white  px-4 rounded hover:bg-blue-400 transition"
      >
        <Save size={24} className="mr-2" />
        Save Resume
      </button>
    </div>
  );
};

export default Recuitment;
