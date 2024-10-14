import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtwork, fetchArtwprkOfUser } from "../store/slices/artWorkSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ReactPlayer from "react-player";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  likeArtwork,
  unlikeArtwork,
  fetchLikesByArtwork,
} from "../store/slices/activity/likeSlice";

import {
  showNotification,
  hideNotification,
} from "../store/slices/notificationSlice";

const ArtworkDetail = () => {
  const { artworkId } = useParams(); // Get the artworkId from the URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { artworks } = useSelector((state) => state.artwork); // Get the artworks from the global state
  const { loggedIn, id } = useSelector((state) => state.user);
  const { likes } = useSelector((state) => state.like.likes);

  const [artwork, setArtwork] = useState(null); // Start with null instead of empty array
  const [likeCount, setLikeCount] = useState();
  const [isLike, setIsLike] = useState();

  // console.log(artworks);

  // Fetch artwork and likes when artworkId changes
  useEffect(() => {
    if (artworkId) {
      // dispatch(fetchArtwork(artworkId));
      dispatch(fetchLikesByArtwork(artworkId));
    }
  }, [artworkId, dispatch]);

  useEffect(() => {
    console.log(likes);
    if (Array.isArray(likes)) {
      setLikeCount(likes.length);
      setIsLike(likes.some((like) => like.userId._id === id));
    }
  }, [likes, id]);

  // Find the current artwork based on artworkId
  useEffect(() => {
    if (artworks.length > 0) {
      const selectedArtwork = artworks.find(
        (artwork) => artwork._id === artworkId
      );
      setArtwork(selectedArtwork);
    }
  }, [artworks, artworkId]); // Ensure artwork is set when artworks are loaded

  useEffect(() => {
    if (artworks.length > 0) {
      const selectedArtwork = artworks.find(
        (artwork) => artwork._id === artworkId
      );
      setArtwork(selectedArtwork);
    }
  }, [artworks, artworkId]); // Ensure artwork is set when artworks are loaded

  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(
    artworks.findIndex((a) => a._id === artworkId)
  ); // Find the index of the current artwork

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

  // like improvements: status for like to wait fetch

  const handleLike = () => {
    if (!loggedIn) {
      // navigate("/login");
      // navigate("/login");
      dispatch(
        showNotification({
          type: "warning",
          message: "Please login to like this artwork",
        })
      );
      setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
      return;
    }

    if (isLike) {
      dispatch(unlikeArtwork({ id, artworkId }));
      setLikeCount(likeCount - 1);
      setIsLike(false);
    } else {
      dispatch(likeArtwork({ id, artworkId }));
      setLikeCount(likeCount + 1);
      setIsLike(true);
    }
    console.log(isLike);
  };

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
                  loop={ false}
                />
              ) : (
                <img
                  src={file.fileUrl}
                  alt="Artwork"
                  className=" w-full h-auto object-cover"
                />
              )}

              {file.description && <p>{file.description}</p>}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className=" relative w-full  flex justify-around mt-4">
          <div className=""></div>
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
            src={currentArtwork.artist?.profilePicture || "default-avatar-url"}
            alt={currentArtwork.artist?.name || "Unknown Artist"}
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
          <button
            className=" flex space-x-2 bg-gray-700 px-4 py-2 rounded-md"
            onClick={handleLike}
          >
            <p> {isLike ? "Unlike" : "Like"} </p> <p>{likeCount}</p>
          </button>
          {/* <button className="bg-gray-700 px-4 py-2 rounded-md">Share</button> */}
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
