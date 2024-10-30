import { Building2, CodeSquare } from "lucide-react";
import TextArea from "../components/input/textArea";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecruitmentById } from "../store/slices/recruitmentSlice";
import { useSelector } from "react-redux";
import { confirmInterview } from "../store/slices/recruitmentSlice";
import { addFeedback } from "../store/slices/recruitmentSlice";

const DetailUserApplication = () => {
  const dispatch = useDispatch();
  const recuitmentId = useParams().recuitmentId;
  const applyDetails = useSelector((state) => state.recruitment.applyDetails);
  const loading = useSelector((state) => state.recruitment.loading);
  const jobLoading = useSelector((state) => state.recruitment.loading);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);
  console.log(applyDetails);

  useEffect(() => {
    if (!applyDetails || applyDetails.job._id !== recuitmentId) {
      dispatch(getRecruitmentById(recuitmentId));
    }
  }, [dispatch, recuitmentId]);

  useEffect(() => {
    if (applyDetails && applyDetails.interviews) {
      setIsConfirmed(applyDetails.interviews.confirmed);
    }

    if (applyDetails && applyDetails?.feedback?.date) {
      setIsFeedback(true);
    }
  }, [applyDetails]);

  console.log(applyDetails?.feedback);

  const handleConfirmInterview = async () => {
    try {
      await dispatch(confirmInterview(recuitmentId)).unwrap();
      setIsConfirmed(true);
    } catch (error) {
      console.error("Error confirming interview:", error);
    }
  };

  const [feedback, setFeedback] = useState({
    rating: 5,
    text: "",
  });

  const handleFeedbackChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFeedback = async () => {
    console.log(feedback);
    if (feedback.rating && feedback.text) {
      try {
        await dispatch(addFeedback({ applicationId: recuitmentId, feedback }));
        setFeedback({ rating: "", text: "" }); // Clear the form
        setIsFeedback(true);
      } catch (error) {
        console.error("Error adding feedback:", error);
      }
    } else {
      console.log("Please provide both rating and feedback text.");
    }
  };

  if (loading || jobLoading) {
    return <p>Loading...</p>;
  }

  if (!applyDetails) {
    return <p>No application details found.</p>;
  }
  return (
    <div className="bg-bg-pf w-full rounded-lg p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">{applyDetails.job.title}</h1>
        <p className="text-gray-300 "> Status: {applyDetails.status}</p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Building2 />
        <p className="font-bold text-lg">
          {applyDetails.job.studioId?.name || applyDetails.job.posterBy?.name}
        </p>
      </div>

      <div className="mt-2 space-y-4 flex items-center justify-between">
        <p>Apply Date: {applyDetails.createdAt.toString().split("T")[0]}</p>

        <div className="space-y-4">
          <h2 className="font-bold ">Contact:</h2>
          {applyDetails.job.studioId?.contactInfor?.email ||
          applyDetails.job.posterBy?.email ? (
            <p>
              Email:{" "}
              {applyDetails.job.studioId?.contactInfor?.email ||
                applyDetails.job.posterBy?.email}
            </p>
          ) : (
            <p>Email: N/A</p>
          )}
          {applyDetails.job.studioId?.contactInfor?.phone ||
          applyDetails.job.posterBy?.phone ? (
            <p>
              Phone:{" "}
              {applyDetails.job.studioId?.contactInfor?.phone ||
                applyDetails.job.posterBy?.phone}
            </p>
          ) : (
            <p>Phone: N/A</p>
          )}
        </div>

        <div className="space-y-4">
          {applyDetails.job.studioId ? (
            applyDetails.job.salaryRange ? (
              <>
                <h2 className="font-bold ">Salary:</h2>
                <div className="">
                  <p>
                    {applyDetails.job.salaryRange.min?.toLocaleString("vi")} -{" "}
                    {applyDetails.job.salaryRange.max?.toLocaleString("vi")} /{" "}
                    {applyDetails.job.salaryRange?.currency}
                  </p>
                </div>
              </>
            ) : (
              <p>Negotiate</p>
            )
          ) : (
            <>
              <h2 className="font-bold ">Budget:</h2>
              <p>
                {applyDetails.job.budget?.toLocaleString("vi")}{" "}
                {applyDetails.job.currency}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="  mt-5   py-2  items-center">
        <h2 className="font-bold p-0 m-0 ">Interview scheduled </h2>
        <div className="border-2 rounded-lg border-gray-500 p-4 mt-2 flex items-center justify-between">
          <p>
            Date:
            {applyDetails.interviews.date
              ? " " + applyDetails.interviews.date.toString().split("T")[0]
              : " not scheduled yet"}
          </p>
          <button
            className=" bg-blue-500 hover:bg-blue-700 disabled:opacity-35"
            disabled={applyDetails.job.interviews?.date || !isConfirmed}
            type="button"
            onClick={handleConfirmInterview}
          >
            Confirm Interview
          </button>
        </div>
      </div>

      <div className="">
        <h2 className="font-bold mt-5">Feedback</h2>
        <div className="border-2 space-y-4 rounded-lg border-gray-500 p-4 mt-2  items-center justify-between">
          <div className="flex items-center gap-4">
            <label>Rating:</label>{" "}
            <select
              disabled={
                applyDetails.status === "pending" ||
                applyDetails.status === "reviewing" ||
                isFeedback
              }
              className="mt-2 block w-[15%] bg-bg-pf rounded-md border-0 py-1.5 pl-3 pr-10 text-white ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={feedback.rating}
              onChange={handleFeedbackChange}
              name="rating"
            >
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>
          </div>
          <TextArea
            name="text"
            className="disabled:opacity-35"
            // disabled={
            //   applyDetails.status === "pending" ||
            //   applyDetails.status === "reviewing" ||
            //   isFeedback
            // }
            disabled
            onChange={handleFeedbackChange}
            value={feedback.text}
          />
          <button
            onClick={handleAddFeedback}
            className=" bg-blue-500 hover:bg-blue-700 disabled:opacity-35"
            type="button"
            disabled={
              applyDetails.status === "pending" ||
              applyDetails.status === "reviewing" ||
              isFeedback
            }
          >
            Add feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailUserApplication;
