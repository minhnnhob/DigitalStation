// src/components/ArtworkList.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtworks, deleteArtwork } from "../../store/slices/artWorkSlice";
import axios from "axios";

import Loading from "../loading/Loading";
import {
  showNotification,
  hideNotification,
} from "../../store/slices/notificationSlice";

const ArtworkDetails = ({ artwork }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const artistId = artwork.artist._id; // Assuming artist ID is within the artwork object
    const artworkId = artwork._id; // Get artwork ID directly from the artwork object

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/artworks/${artistId}/${artworkId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(deleteArtwork(artworkId)); // Dispatch with the artwork ID
      }
    } catch (error) {
      console.log("Error deleting artwork:", error);
    }
  };

  return (
    <div className="bg-[#1c1c1c] rounded-sm overflow-hidden shadow-lg transition-transform transform hover:translate-y-[-5px] hover:shadow-xl">
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={artwork.files[0]?.fileUrl}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform transform hover:scale-105"
        />
      </div>
      {/* <div className="p-2 text-white">
      <h3 className="text-lg my-2">{artwork.title}</h3> 
      <p className="text-sm text-gray-500 mb-2">{artwork.artist.name}</p>
      <button onClick={handleDelete} className="px-3 py-2 bg-[#e63946] text-white rounded hover:bg-[#d62839] transition-colors">
        Delete
      </button>
    </div> */}
    </div>
  );
};

const ArtworkList = () => {
  const dispatch = useDispatch();

  const { artworks, loading, error } = useSelector((state) => state.artwork);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        await axios.get("http://localhost:4000/api/artworks", {
          withCredentials: true,
        });
        dispatch(fetchArtworks());
      } catch (error) {
        dispatch(
          showNotification({
            type: "error",
            message: "Error fetching artworks",
          })
        );
        setTimeout(() => {
          dispatch(hideNotification());
        }, 3000);
      }
    };
    fetchArtworks();
  }, [dispatch]);

  if (artworks === null) {
    return <p>No artworks found</p>;
  }

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-[repeat(5,_minmax(200px,_2fr))] gap-0.5 p-2 bg-[#121212]">
      {artworks.map((artwork) => (
        <ArtworkDetails key={artwork._id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkList;
