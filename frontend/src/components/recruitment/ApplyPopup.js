import React, { useState } from "react";
import { X, Paperclip } from "lucide-react";
import { useDispatch } from "react-redux";
import { applyJob } from "../../store/slices/recruitmentSlice";
import { useSelector } from "react-redux";

import {
  showNotification,
  hideNotification,
} from "../../store/slices/notificationSlice";

const ApplyJobPopup = ({ jobId, onClose, isOpen }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loading, error } = useSelector((state) => state.recruitment);

  const handleChangeResume = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    if (
      e.target.files[0].type === "application/pdf" ||
      e.target.files[0].type === "application/xls"
    ) {
      setResumeFile(e.target.files[0]);
    } else {
      dispatch(
        showNotification({
          message: "Please upload a PDF file",
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
    }
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("coverLetter", coverLetter);
    if (resumeFile) {
      formData.append("resumeVersion", resumeFile);
    }

    try {
      await dispatch(applyJob(formData)).unwrap();
      setSubmissionStatus("success");

      onClose();
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionStatus === "success") {
    return (
      <div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-[80%] rounded-lg bg-white p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Applicant Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Application for
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Backend Developer
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Cover Letter
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {coverLetter}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Attachments
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <Paperclip className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            {resumeFile?.name || "resume.pdf"}
                          </span>
                          <span className="flex-shrink-0 text-gray-400">
                            {resumeFile?.size
                              ? `${(resumeFile.size / 1024 / 1024).toFixed(
                                  2
                                )}mb`
                              : "2.4mb"}
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  }
  // console.log("isOpen", isOpen);
  // console.log("onClose", onClose);

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-- bg-opacity-50">
          <div className="relative w-[80%] rounded-lg bg-bg-pf p-6">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-white">
                Apply for Job
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Please provide your cover letter and resume to apply.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="  space-y-4">
              <div className="rounded-md   py-4">
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium text-white mb-4"
                >
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={4}
                  className="mt-1 block w-full rounded-md bg-bg-pf border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  required
                />
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700"
                >
                  Resume
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChangeResume}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              {submissionStatus === "error" && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Application submission failed
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>
                          There was an error submitting your application. Please
                          try again.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`rounded px-4 py-2 font-bold text-white ${
                    isSubmitting
                      ? "cursor-not-allowed bg-blue-300"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ApplyJobPopup;
