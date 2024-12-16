import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ArtworkCart from "./ArtDetail";

import Loading from "../loading/Loading";

const ArtworkOfUser = ({ artworksUser }) => {
  //   const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.artwork);

  const [artworks, setArtworks] = useState(artworksUser);

  useEffect(() => {
    if (artworksUser) {
      // artworksUser is an object with a property artworks
      setArtworks(artworksUser);
    }
  }, [artworksUser]);
  console.log(artworksUser);

  if (!artworks || artworks.length === 0) {
    return (
      <div className="flex flex-col mt-[5%]  h-screen bg-[#121212] text-white">
        <div className="flex flex-col items-center">
          {/* Image placeholder (you can replace this with an actual image) */}
          <div className="w-40 h-40 bg-gray-700 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm11 12a1 1 0 010-2h-3a1 1 0 010-2h2a1 1 0 110-2h-2a1 1 0 110-2h3a1 1 0 010 2h-2a1 1 0 110 2h2a1 1 0 110 2h-3a1 1 0 010 2h3z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Text Section */}
          <h1 className="mt-8 text-3xl font-semibold">Upload your artwork</h1>
          <p className="mt-4 text-center text-gray-400 max-w-md">
            Fill your portfolio with projects you are proud of. Get feedback on
            your work and build your industry network.
          </p>

          {/* Button */}
          <button className="mt-8 px-6 py-2 bg-white text-black rounded-md shadow-lg hover:bg-gray-300">
            Upload a project
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <Loading />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0.5 p-2 bg-[#121212]">
      {artworks?.map((artwork) => (
        <ArtworkCart key={artwork?._id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkOfUser;
