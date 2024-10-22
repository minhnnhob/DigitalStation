import React, { useEffect, useState } from "react";
import LineSpace from "../components/line/lineSpace";
import InforInput from "../components/input/inforInput";
import TextArea from "../components/input/textArea";
import Select from "react-select";
import DatePicker from "../components/Date/DatePicker";
import CountryPicker from "../components/location/CountryPicker";
import CityPicker from "../components/location/CityPicker";
import { Save, X } from "lucide-react";

const Recuitment = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill === "") return;
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // location
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const handleCountryChange = (val) => {
    setCountry(val);
    setCity(""); // Reset city when country changes
  };

  const handleCityChange = (val) => {
    setCity(val);
  };

  // experience
  // States to manage Datepicker visibility
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  // Handle  date change
  const handleStartDateChange = (date) => {
    setEndDate(date); // Prevent end date from being before start date
    if (date < startDate) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    } else {
      alert("End date cannot be earlier than the start date.");
    }
  };

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
    console.log(startDate, endDate);
    console.log(startDate > endDate);
  }, [startDate, endDate]);

  const [isExperinceOpen, setIsExperinceOpen] = useState(false);

  const toggleExperienceForm = () => {
    setIsExperinceOpen(!isExperinceOpen); // Toggle form visibility
  };

  const handleCheckbox = () => {
    setCurrentlyWorking(!currentlyWorking);
    if (!currentlyWorking) setEndDate(null); // Clear endDate if currently working
  };

  const handExprienceleSave = () => {
    // Handle form submission logic here
    console.log("Form submitted");
  };

  const handleExprienceCancel = () => {
    // Handle cancel logic here
    setIsExperinceOpen(false); // Close form on cancel
  };

  // Education
  const [startDateEducation, setStartDateEducation] = useState(new Date());
  const [endDateEducation, setEndDateEducation] = useState(new Date());

  const [isEducationOpen, setIsEducationOpen] = useState(false);

  // Handle  date change

  const toggleEducationForm = () => {
    setIsEducationOpen(!isEducationOpen); // Toggle form visibility
  };

  const handleStartDateEducationChange = (date) => {
    setEndDateEducation(date); // Prevent end date from being before start date
    if (date < startDateEducation) {
      setStartDateEducation(date);
    }
  };

  const handleEndEducationDateChange = (date) => {
    if (date >= startDateEducation) {
      setEndDateEducation(date);
    } else {
      alert("End date cannot be earlier than the start date.");
    }
  };

  const handEducationSave = () => {
    // Handle form submission logic here
    console.log("Form submitted");
  };

  const handleEducationCancel = () => {
    // Handle cancel logic here
    setIsEducationOpen(false); // Close form on cancel
  };

  useEffect(() => {
    if (startDateEducation > endDateEducation) {
      setEndDate(startDateEducation);
    }
    console.log(startDateEducation, endDateEducation);
    console.log(startDateEducation > endDateEducation);
  }, [startDateEducation, endDateEducation]);

  const handleSave = () => {
    // Handle save logic here
    console.log("Save resume");
  };

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
              className="form-checkbox text-blue-500 rounded bg-gray-700 border-gray-600 focus:ring-blue-500"
              checked
            />
            <span className="ml-2">Full-time employment</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500 rounded bg-gray-700 border-gray-600 focus:ring-blue-500"
            />
            <span className="ml-2">Contract</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500 rounded bg-gray-700 border-gray-600 focus:ring-blue-500"
            />
            <span className="ml-2">Freelance</span>
          </label>
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Save
        </button>
        <LineSpace /> {/* Profestion Sumarry */}
        <h2 className="text-xl font-semibold  mb-4">Professional Summary</h2>
        <div className="mb-8">
          {/* <InforInput type /> */}
          <TextArea label={"Summary"} />
        </div>
        <LineSpace /> {/* Réume */}
        <h2 className="text-xl font-semibold  mb-4">Resume</h2>
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
        <LineSpace /> {/* Skills */}
        <h2 className="text-xl font-semibold  mb-4">Skills</h2>
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">
            Add skills and proficiencies so that employers can search for you.
            E.g. "Concept Art", "3D Modeling", etc.
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
        <LineSpace /> {/* Expẻince */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Professional Experience
          </h2>

          {/* Toggle form visibility on button click */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mb-6 flex items-center"
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
                />
              </div>

              <div className="mb-4">
                <InforInput
                  label={"* Title"}
                  type="text"
                  id="title"
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Title"
                />
              </div>

              <div className="mb-4">
                <CountryPicker value={country} onChange={handleCountryChange} />
              </div>

              <div className="mb-4">
                <CityPicker
                  country={country}
                  value={city}
                  onChange={handleCityChange}
                  disabled={!country}
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
                      initialDate={startDate}
                      onDateChange={handleStartDateChange}
                    />
                  </div>
                  {!currentlyWorking && (
                    <>
                      <div className="w-1/2">
                        {/* End Date Picker */}{" "}
                        <DatePicker
                          initialDate={endDate}
                          onDateChange={handleEndDateChange}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-2">
                  <label className="text-white text-sm">
                    <input
                      type="checkbox"
                      checked={currentlyWorking}
                      onChange={handleCheckbox}
                      className="mr-2"
                    />
                    I currently work here
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <TextArea label={"Description"} />
              </div>

              <div className="flex justify-start gap-6">
                <button
                  onClick={handExprienceleSave}
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
        <LineSpace /> {/* Education */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Education</h2>

          {/* Toggle form visibility on button click */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mb-6 flex items-center"
            onClick={toggleEducationForm}
          >
            <span className="mr-2">+</span> Add Position
          </button>

          {/* Form is only visible when isOpen is true */}
          {isEducationOpen && (
            <div>
              <div className="mb-4">
                <InforInput
                  label={"*Company"}
                  type="text"
                  id="company"
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company"
                />
              </div>

              <div className="mb-4">
                <InforInput
                  label={"* Title"}
                  type="text"
                  id="title"
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Title"
                />
              </div>

              <div className="mb-4">
                <CountryPicker value={country} onChange={handleCountryChange} />
              </div>

              <div className="mb-4">
                <CityPicker
                  country={country}
                  value={city}
                  onChange={handleCityChange}
                  disabled={!country}
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
                      initialDate={startDate}
                      onDateChange={handleStartDateEducationChange}
                    />
                  </div>
                  {!currentlyWorking && (
                    <>
                      <div className="w-1/2">
                        {/* End Date Picker */}{" "}
                        <DatePicker
                          initialDate={endDate}
                          onDateChange={handleEndEducationDateChange}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-2">
                  <label className="text-white text-sm">
                    <input
                      type="checkbox"
                      checked={currentlyWorking}
                      onChange={handleCheckbox}
                      className="mr-2"
                    />
                    I currently work here
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <TextArea label={"Description"} />
              </div>

              <div className="flex justify-start gap-6">
                <button
                  onClick={handEducationSave}
                  className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </button>
                <button
                  onClick={handleEducationCancel}
                  className="flex items-center bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>{" "}
        <LineSpace /> {/* Save All */}
        <button
          onClick={handleSave}
          className="flex items-center ml-0 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition"
        >
          <Save size={24} className="mr-2" />
          Save Resume
        </button>
      </div>
    </div>
  );
};

export default Recuitment;
