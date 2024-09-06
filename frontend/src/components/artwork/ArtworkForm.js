// src/components/ArtworkForm.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArtwork } from "../../store/slices/artWorkSlice";
import axios from "axios";

const ArtworkForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const id = useSelector((state) => state.user.id);


  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("artistId", id);
    formData.append("domain", domain);
    formData.append("tags", tags);
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        "http://localhost:4000/api/artworks",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

  
      if (response.status === 201) {
        // setTitle("");
        // setDescription("");

        // setDomain("");
        // setTags("");
        // setFiles([]);
        // setError(null);
        // setFiles([]);
        console.log("check");
        
        dispatch(createArtwork(response.data));
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new artwork</h3>

      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Description</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      {/* <label>Artist ID</label>
      <input
        type="text"
        onChange={(e) => setArtistId(e.target.value)}
        value={artistId}
      /> */}

      <label>Domain</label>
      <input
        type="text"
        onChange={(e) => setDomain(e.target.value)}
        value={domain}
      />

      <label>Tags</label>
      <input
        type="text"
        onChange={(e) => setTags(e.target.value)}
        value={tags}
      />

      <label>Files</label>
      <input type="file" multiple onChange={handleFileChange} />

      <button type="submit">Add Artwork</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ArtworkForm;
