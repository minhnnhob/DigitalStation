// src/components/ArtworkList.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtworks, deleteArtwork } from "../../store/slices/artWorkSlice";
import ArtworkCart from "./ArtDetail";

import Loading from "../loading/Loading";
import {
  showNotification,
  hideNotification,
} from "../../store/slices/notificationSlice";

const ArtworkList = () => {
  const dispatch = useDispatch();

  const { artworks, loading, error } = useSelector((state) => state.artwork);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchArtworks()).unwrap(); // .unwrap() will throw an error if the thunk is rejected
      } catch (error) {
        dispatch(
          showNotification({
            type: "error",
            message: "Error fetching artworks",
          })
        );
      }
    };

    fetchData();
  }, [dispatch]);
  

  if (artworks === null) {
    return <p>No artworks found</p>;
  }

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0.5 p-2 bg-[#121212]">
      {artworks.map((artwork) => (
        <ArtworkCart key={artwork._id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkList;
