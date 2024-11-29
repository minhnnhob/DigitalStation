import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchArtworks,
  fetchArtwprkOfUser,
} from "../store/slices/artWorkSlice";
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
  followUser,
  unfollowUser,
  fetchFollowers,
} from "../store/slices/activity/followSlice";

import {
  addComment,
  fetchComments,
} from "../store/slices/activity/commentSlice";

import {
  showNotification,
  hideNotification,
} from "../store/slices/notificationSlice";

const ArtworkDetail = () => {
  const { artworkId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const artworks = useSelector((state) => state.artwork.artworks);
  const { loggedIn, id } = useSelector((state) => state.user);
  const { likes } = useSelector((state) => state.like.likes);
  const { followers } = useSelector((state) => state.follow);
  const { comments } = useSelector((state) => state.comment);

  const [artwork, setArtwork] = useState(null); // Start with null instead of empty array
  const [likeCount, setLikeCount] = useState();
  const [isLike, setIsLike] = useState();
  const [isFollowing, setIsFollowing] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);


  const [visibleComments, setVisibleComments] = useState(3); // Limit initial comments


  // Fetch artworks when component mounts
  useEffect(() => {
    dispatch(fetchArtworks());
  }, [dispatch, id]);

  // Fetch artwork and likes when artworkId changes
  useEffect(() => {
    if (artworkId) {
      dispatch(fetchLikesByArtwork(artworkId));
      dispatch(fetchComments(artworkId));
    }
  }, [artworkId, dispatch]);

  useEffect(() => {
    if (Array.isArray(likes)) {
      setLikeCount(likes?.length);
      setIsLike(likes?.some((like) => like.userId._id === id));
    }
  }, [likes, id]);

  // Fetch followers when following changes
  useEffect(() => {
    if (artwork?.artist?._id) {
      dispatch(fetchFollowers(artwork.artist._id));
    }
  }, [artwork?.artist?._id, dispatch]);

  useEffect(() => {
    if (Array.isArray(followers)) {
      setIsFollowing(
        followers.some((follower) => follower.followerId._id === id)
      );
    }
  }, [followers, id]);

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
    artworks?.findIndex((a) => a._id === artworkId)
  ); // Find the index of the current artwork

  useEffect(() => {
    const index = artworks?.findIndex((a) => a._id === artworkId);
    setCurrentArtworkIndex(index !== -1 ? index : 0); // Update when props change
  }, [artworks, artworkId]);

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
      navigate(`/artwork/${artworks[newIndex]?._id}`); // Navigate to the previous artwork
      return newIndex;
    });
  };
  // console.log(currentArtworkIndex);
  const currentArtwork = artworks?.[currentArtworkIndex];
  // console.log(artworks?.[currentArtworkIndex]?._id); //id
  // console.log(currentArtwork); // undifine
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

  const handleFollow = () => {
    if (!loggedIn) {
      dispatch(
        showNotification({
          type: "warning",
          message: "Please login to follow this artist",
        })
      );
      return;
    }

    if (isFollowing) {
      dispatch(
        unfollowUser({ followerId: id, followingId: artwork.artist._id })
      );
      setIsFollowing(false);
    } else {
      dispatch(followUser({ followerId: id, followingId: artwork.artist._id }));
      setIsFollowing(true);
    }
  };

  // comment
  console.log(comments);

  const handleAddComment = async () => {
    if (!loggedIn) {
      dispatch(
        showNotification({
          type: "warning",
          message: "Please login to add a comment",
        })
      );
      return;
    }

    if (newComment.trim()) {
      try {
        const result = await dispatch(
          addComment({ artworkId, comment: newComment })
        ).unwrap();
        console.log(result);
        setNewComment("");
        dispatch(
          showNotification({
            type: "success",
            message: "Comment added successfully!",
          })
        );
      } catch (error) {
        console.error("Failed to add comment:", error);
        dispatch(
          showNotification({
            type: "error",
            message: "Failed to add comment",
          })
        );

        setTimeout(() => {
          dispatch(hideNotification());
        }, 3000);
      }
    }
    // await dispatch(addComment({ artworkId:artworkId, comment: newComment, parentId: null }));
  };

  const handleReplyComment = (parentCommentId) => {
    if (!loggedIn) {
      dispatch(
        showNotification({
          type: "warning",
          message: "Please login to reply to a comment",
        })
      );
      return;
    }

    if (replyComment.trim()) {
      dispatch(
        addComment({
          artworkId,
          comment: replyComment,
          parentId: parentCommentId,
        })
      )
        .unwrap()
        .then((result) => {
          // Display a notification and clear input fields upon successful addition
          dispatch(
            showNotification({
              type: "success",
              message: "Reply added successfully!",
            })
          );
          setReplyComment("");
          setReplyTo(null);
        })
        .catch((error) => {
          console.error("Failed to add reply:", error);
          dispatch(
            showNotification({
              type: "error",
              message: "Failed to add reply",
            })
          );
        });
    }
  };

  // Check if artwork exists and handle cases where artwork is undefined
  if (!artwork) {
    return <div className="text-white">Artwork not found</div>;
  }




  const handleLoadMore = () => {
    setVisibleComments((prev) => prev + 3); // Load 3 more comments each time
  };

  return (
    <div className="flex w-full lg:flex-row justify-center p-4 bg-bg-df">
      <div className="artwork-carousel w-[70%] h-screen overflow-y-scroll no-scrollbar">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {currentArtwork?.files?.map((file, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center">
              {file.fileType === "video" || file.fileType === "video/mp4" ? (
                <ReactPlayer
                  url={file.fileUrl}
                  controls
                  width="100%"
                  playing={true}
                  loop={false}
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
            src={currentArtwork?.artist?.profilePicture || "default-avatar-url"}
            alt={currentArtwork?.artist?.name || "Unknown Artist"}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {artwork?.artist?.name || "Unknown Artist"}
            </h2>
            <button
              className={`mt-1 px-4 py-1 rounded-sm ${
                isFollowing ? "bg-red-500" : "bg-blue-500"
              } text-white`}
              onClick={handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
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
      
      {/* New Comment Input */}
      <div className="my-4">
        <textarea
          className="w-full p-2 bg-gray-800 rounded-md text-white"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>

      {/* Comments List */}
      {comments?.length > 0 ? (
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
          {comments.slice(0, visibleComments).map((comment) => (
            <div key={comment?._id} className="mb-4">
              
              {/* Comment User Information */}
              <div className="flex items-center gap-2">
                <img
                  src={comment?.userId?.profilePicture || "default-avatar-url"}
                  alt={comment?.userId?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-sm font-semibold">{comment?.userId?.name}</p>
              </div>
              
              {/* Comment Text */}
              <p className="text-gray-400 max-h-24 overflow-y-auto break-words bg-gray-900 p-2 rounded-md">
                {comment?.comment}
              </p>
              
              {/* Reply Button */}
              <button
                className="text-blue-500 text-sm"
                onClick={() => setReplyTo(comment?._id)}
              >
                Reply
              </button>
              
              {/* Replies */}
              {comment?.replies && comment?.replies?.length > 0 && (
                <div className="ml-8 mt-2">
                  {comment?.replies.map((reply) => (
                    <div key={reply?._id} className="mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={reply?.userId?.profilePicture || "default-avatar-url"}
                          alt={reply?.userId?.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <p className="text-sm font-semibold">{reply?.userId?.name}</p>
                      </div>
                      <p className="text-gray-400 max-h-16 overflow-y-auto bg-gray-900 p-2 rounded-md">
                        {reply?.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              {replyTo === comment?._id && (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 bg-gray-800 rounded-md text-white"
                    rows="2"
                    placeholder="Add a reply..."
                    value={replyComment}
                    onChange={(e) => setReplyComment(e.target.value)}
                  ></textarea>
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleReplyComment(comment?._id)}
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
          
          {/* Load More Button */}
          {visibleComments < comments.length && (
            <button
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-md"
              onClick={handleLoadMore}
            >
              Load more comments
            </button>
          )}
        </div>
      ) : (
        <div className="mt-2 text-gray-400">No comments yet.</div>
      )}
    </div>
  
      </div>
    </div>
  );
};

export default ArtworkDetail;
