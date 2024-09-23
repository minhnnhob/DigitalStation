import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtwork } from "../store/slices/artWorkSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ReactPlayer from "react-player";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ArtworkDetail = () => {
  const { artworkId } = useParams(); // Get the artworkId from the URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { artworks } = useSelector((state) => state.artwork); // Get the artworks from the global state
  const { loggedIn } = useSelector((state) => state.user.loggedIn);

  const [artwork, setArtwork] = useState(null); // Start with null instead of empty array

  useEffect(() => {
    if (loggedIn) {
      // Check if user is logged in to fetch
      dispatch(fetchArtwork(artworkId)).unwarp();
      console.log(dispatch(fetchArtwork(artworkId).unwarp())); // Fetch the artwork by ID
    }
  }, [artworkId, loggedIn, dispatch]); // Dependency array updated to listen to artworkId

  useEffect(() => {
    if (artworks.length > 0) {
      const selectedArtwork = artworks.find(
        (artwork) => artwork._id === artworkId
      );
      setArtwork(selectedArtwork);
    }
  }, [artworks, artworkId]); // Ensure artwork is set when artworks are loaded

  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(
    artworks.findIndex((artwork) => artwork._id === artworkId)
  ); // Find the index of the current artwork
  console.log(currentArtworkIndex);

  // // Function to handle next/previous artwork
  // Function to handle next artwork
  const handleNextArtwork = () => {
    setCurrentArtworkIndex((prevIndex) => {
      const newIndex = prevIndex < artworks.length - 1 ? prevIndex + 1 : 0;
      navigate(`/artwork/${artworks[newIndex]._id}`); // Navigate to the next artwork
      return newIndex;
    });
  };

  // Function to handle previous artwork
  const handlePreviousArtwork = () => {
    setCurrentArtworkIndex((prevIndex) => {
      if (prevIndex === 0) {
        return prevIndex; // Don't navigate if we're already at the first artwork
      }
      const newIndex = prevIndex - 1;
      navigate(`/artwork/${artworks[newIndex]._id}`); // Navigate to the previous artwork
      return newIndex;
    });
  };

  const currentArtwork = artworks[currentArtworkIndex];

  // Check if artwork exists and handle cases where artwork is undefined
  if (!artwork) {
    return <div className="text-white">Artwork not found</div>;
  }

  // Check if artwork files exist before accessing them

  return (
    <div className="flex w-full lg:flex-row justify-center p-4 bg-bg-df">
      <div className="artwork-carousel w-[70%] h-screen overflow-y-scroll no-scrollbar">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {currentArtwork.files.map((file, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center">
              {file.fileType === "video" || file.fileType === "video/mp4" ? (
                <ReactPlayer
                  url={file.fileUrl}
                  controls
                  width="100%"
                  playing={true}
                  loop={true}
                />
              ) : (
                <img
                  src={file.fileUrl}
                  alt="Artwork"
                  className="w-full h-auto"
                />
              )}

              {file.description && <p>{file.description}</p>}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className=" relative w-full  flex justify-around mt-4">
          <div className="">
            
          </div>
          <button
            onClick={handlePreviousArtwork}
            className=" ml-4 fixed left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-gray-700 "
            disabled={currentArtworkIndex === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button
            onClick={handleNextArtwork}
            className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-gray-700 "
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      {/* Artist Information */}
      <div className="mt-4 lg:mt-0 lg:ml-6 w-full lg:w-1/3 bg-[#1c1c1c] p-6 text-white">
        <div className="flex items-center gap-4">
          <img
            src={artwork.artist?.profileImage || "default-avatar-url"}
            alt={artwork.artist?.name || "Unknown Artist"}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {artwork.artist?.name || "Unknown Artist"}
            </h2>
            <button className="mt-1 bg-blue-500 text-white px-4 py-1 rounded-sm">
              Follow
            </button>
          </div>
        </div>

        {/* Artwork Actions */}
        <div className="mt-4 flex items-center gap-4">
          <button className="bg-gray-700 px-4 py-2 rounded-md">Like</button>
          <button className="bg-gray-700 px-4 py-2 rounded-md">Share</button>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Comments</h3>
          {/* Placeholder for comments */}
          <div className="mt-2 text-gray-400">No comments yet.</div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
