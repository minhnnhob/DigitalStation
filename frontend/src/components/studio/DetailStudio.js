import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStudio } from "../../store/slices/studioSlice";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

import { ChevronLeft, MapPin, Globe } from "lucide-react";

const DetailStudio = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studio = useSelector((state) => state.studio.selectedStudio);
  const loading = useSelector((state) => state.studio.loading);

  useEffect(() => {
    if (!studio) {
      dispatch(fetchStudio(id));
    }
  }, [dispatch, id, studio]);

  if (loading) {
    return <Loading />;
  }

  if (!studio) {
    return <div>Studio not found</div>;
  }

  return (
    <div className="block rounded-lg">
      <div className="relative w-full h-full  bg-gradient-to-b   rounded-lg ">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 font-semibold z-10"
        >
          <div className="flex">
            <ChevronLeft /> Studios
          </div>
        </button>

        <div className="absolute left-[100px] top-[220px] h-full w-full  flex z-10">
          <div className="w-36 h-36  rounded-full bg-white flex items-center justify-center  z-10 mr-10 ">
            <img
              src={studio.studioProfileImage}
              alt={studio.name}
              className=" w-28 h-28  object-fit    "
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{studio.name}</h2>
            <p className="flex gap-2 text-gray-200">
              <MapPin size={20} />
              {studio.location}
            </p>
            <p className="flex gap-2">
              <Globe size={20} />
              {studio.website}
            </p>
          </div>
        </div>

        <img
          src={studio.backgroundImage}
          alt={studio.name}
          className="w-full h-72 object-cover opacity-25 rounded-lg"
        />

        <div className="mt-28 ml-32">
          <h2 className="text-3xl font-semibold">About</h2>
          <p className="mt-4 w-[80%]">{studio.description}</p>
        </div>
      </div>

      <div className="w-full ml-32">
        <h1>{}</h1>
      </div>
    </div>
  );
};

export default DetailStudio;
