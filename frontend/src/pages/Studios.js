import React, { useEffect } from "react";
import { ExternalLink, MapPin, Briefcase } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudios } from "../store/slices/studioSlice";
import Loading from "../components/loading/Loading";
import { useNavigate } from "react-router-dom";

const StudioCard = ({
  _id,
  name,
  studioProfileImage,
  backgroundImage,
  website,
  location,
}) => {
  const navigate = useNavigate();
  const viewStudio = () => {
    navigate(`/studio/${_id}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="relative h-20">
        <img
          src={backgroundImage}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 ">
        <div className=" h-10  rounded-full flex items-center  ">
          <img
            src={studioProfileImage}
            alt={`${name} logo`}
            className=" mr-4  w-10 h-full object-contain drop-shadow-md "
          />
          <h3 className="  text-xl font-bold text-white">{name}</h3>
        </div>

        {website ? (
          <div className="text-gray-400 mb-2 flex items-center mt-4">
            <ExternalLink size={16} className="mr-1" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              {website}
            </a>
          </div>
        ) : (
          ""
        )}

        {location ? (
          <div className="text-gray-400 mb-4 mt-2 flex w-full h-10 items-center overflow-hidden">
            <MapPin size={20} className="mr-1" />
            <span className="truncate">{location}</span>
          </div>
        ) : (
          ""
        )}

        <button onClick={viewStudio} className="w-full  bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center mt-2">
          <Briefcase size={16} className="mr-2" />
          View Studio
        </button>
      </div>
    </div>
  );
};

const StudiosListing = () => {
  const studios = useSelector((state) => state.studio.studios);
  const loading = useSelector((state) => state.studio.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (studios.length === 0) {
      dispatch(fetchStudios());
    }
  }, [dispatch]);

  console.log(studios);

  if (loading) {
    return <Loading />;
  }

  if (!studios.length) {
    return (
      <div className="bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold">No Studios Found</h1>
        <p className="text-gray-400 mt-1">
          Please check back later or try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">
            Studios{" "}
            <span className="text-gray-400 text-xl">
              {studios.length} results
            </span>
          </h1>
          <p className="text-gray-400 mt-1">
            Featured Studios paid for an ArtStation Jobs subscription and are
            shown to all users.
          </p>
        </div>
        <input
          type="text"
          placeholder="City, Region, Country"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studios.map((studio, index) => (
          <StudioCard key={index} {...studio} />
        ))}
      </div>
    </div>
  );
};

export default StudiosListing;
