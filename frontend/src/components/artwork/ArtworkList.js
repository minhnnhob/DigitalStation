// src/components/ArtworkList.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtworks, deleteArtwork } from "../../store/slices/artWorkSlice";
import axios from "axios";

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
    <div className="artwork-card">
      <div className="artwork-image-container">
        <img
          src={artwork.files[0]?.fileUrl} // Display the first file URL as a thumbnail
          alt={artwork.title}
          className="artwork-image"
        />
      </div>
      {/* <div className="artwork-info">
        <h3 className="artwork-title">{artwork.title}</h3> 
        <p className="artwork-artist">{artwork.artist.name}</p>
        <button onClick={handleDelete} className="delete-button">
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
    dispatch(fetchArtworks());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="artwork-gallery">
      {artworks.map((artwork) => (
        <ArtworkDetails key={artwork._id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkList;
