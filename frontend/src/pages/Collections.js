import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { fetchArtwprkOfUser } from "../store/slices/artWorkSlice";
import ArtworkCard from "../components/artwork/ArtOfUserCard";
import Loading from "../components/loading/Loading";
import { deleteArtwork } from "../store/slices/artWorkSlice";

const Collections = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.id);
  console.log(user);
  const { loading, error } = useSelector((state) => state?.artwork);
  const artworks = useSelector((state) => state?.artwork?.artworks);
  const [artworksUser, setArtworksUser] = useState(artworks);

  useEffect(() => {
    dispatch(fetchArtwprkOfUser(user));
  }, [dispatch, user]);

  useEffect(() => {
    if (Array.isArray(artworks)) {
      setArtworksUser(artworks);
    }
  }, [dispatch, artworks]);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );
    if (confirmDelete) {
      await dispatch(deleteArtwork(id)).unwrap();
      setArtworksUser((prevArtworks) =>
        prevArtworks.filter((artwork) => artwork?._id !== id)
      );
    }
  };

  if (loading || !artworksUser)
    return (
      <div>
        <Loading />
      </div>
    );

    if (!Array.isArray(artworksUser)) {
      return <div>No artworks found.</div>;
    }

  return (
    <div>
      <div>
        <div className="bg-gray-600 p-8 rounded-t-sm">
          <h1 className="text-3xl font-bold">My artworks</h1>
          <p className="text-gray-400 ">The collection of your artworks</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0.5 p-2 bg-[#121212]">
          {artworksUser?.map((artwork) => (
            <ArtworkCard
              key={artwork?._id}
              artwork={artwork}
              onDelete={handleDelete}
             
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
