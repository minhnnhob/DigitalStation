// src/components/ArtworkForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  showNotification,
  hideNotification,
} from "../../store/slices/notificationSlice";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useRef } from "react";
import { createTag } from "../../store/slices/category/tagSlice";
import { useParams } from "react-router-dom";
import { fetchArtwork, updateArtwork } from "../../store/slices/artWorkSlice";


const ArtworkForm = () => {
  const { id } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.artwork);
  const artworkId = useParams().artworkId;
  const dispatch = useDispatch();


  useEffect(() => {
    if (artworkId) {
      dispatch(fetchArtwork(artworkId));
    }
  }, [dispatch, artworkId]);

  const artwork = useSelector((state) => state?.artwork?.artworks);

  useEffect(() => {
    if (artwork) {
      setTitle(artwork.title || "Untitled");
      setDescription(artwork.description || "");
      setSelectedMediums(artwork.mediums || []);
      setSelectedSubjects(artwork.topic || []);
      setSoftware(artwork.software || []);
      setTags(artwork.tags || []);

      // Handle existing files
      const existingFiles = artwork.files
        ? artwork.files.map((file) => ({
            file: {
              name: file.fileUrl.split("/").pop(),
              type: file.fileType === "video" ? "video/mp4" : "image/jpeg",
            },
            preview: file.fileUrl,
            caption: file.description || "",
            type: file.fileType,
          }))
        : [];

      setUploadedFiles(existingFiles);
      setThumbnail(artwork.thumbnail);
      setPreview(artwork.thumbnail);
    }
  }, [artwork]);

  const uploadOptions = [
    { name: " Images", icon: "🖼️" },
    { name: "Video Clip", icon: "🎬" },
    { name: "Sketchfab", icon: "🎨" },
    { name: "Marmoset Viewer", icon: "👁️" },
  ];

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [title, setTitle] = useState("Untitled");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const validFiles = acceptedFiles.filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/")
      );

      if (validFiles.length === 0) {
        dispatch(
          showNotification({
            type: "error",
            message: "Please upload valid image or video files",
          })
        );
        return;
      }

      const newFiles = validFiles
        .filter(
          (file) =>
            !uploadedFiles.some(
              (existingFile) => existingFile.file.name === file.name
            )
        )
        .map((file) => ({
          file,
          preview: file.type.startsWith("image")
            ? URL.createObjectURL(file)
            : file.type.startsWith("video")
            ? URL.createObjectURL(file)
            : null,
          caption: "",
          type: file.type.startsWith("image")
            ? "image"
            : file.type.startsWith("video")
            ? "video"
            : "unknown",
        }));

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    [uploadedFiles]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
      "video/*": [".mp4", ".avi", ".mov"],
    },
    multiple: true, // Ensure multiple file selection is enabled
    noClick: false, // Allow clicking to open file selector
    noKeyboard: false, // Allow keyboard interactions
  });
  const handleCaptionChange = (index, caption) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].caption = caption;
    setUploadedFiles(updatedFiles);
  };

  //   tag
  // Medium options

  const mediumOptions = ["Digital 2D", "Digital 3D"];

  const { topics } = useSelector((state) => state.topic);
  const [subjectMatterOptions, setSubjectMatterOptions] = useState([]);

  useEffect(() => {
    if (topics && topics.length > 0) {
      const topicNames = topics.map((topic) => topic.name);
      setSubjectMatterOptions(topicNames);
    }
  }, [topics]);

  const [selectedMediums, setSelectedMediums] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showSubjectSuggestions, setShowSubjectSuggestions] = useState(false);
  const [software, setSoftware] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const subjectInputRef = useRef(null);

  const handleMediumToggle = (medium) => {
    setSelectedMediums((prev) =>
      prev.includes(medium)
        ? prev.filter((m) => m !== medium)
        : [...prev, medium].slice(0, 3)
    );
  };

  const handleSubjectAdd = (subject) => {
    if (selectedSubjects.length < 3 && !selectedSubjects.includes(subject)) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
    setShowSubjectSuggestions(false);
  };

  const handleSubjectRemove = (subject) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
  };

  const handleSoftwareAdd = (name) => {
    if (name && !software.includes(name)) {
      setSoftware([...software, name]);
    }
  };

  const handleSoftwareRemove = (name) => {
    setSoftware(software.filter((s) => s !== name));
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag.toLowerCase().replace(/[\s/]+/g, "-")]);
      setNewTag("");
    }
    dispatch(createTag(newTag));
    console.log(newTag);
  };

  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        subjectInputRef.current &&
        !subjectInputRef.current.contains(event.target)
      ) {
        setShowSubjectSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   thumbnail:
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setPreview(null);
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Common data for both create and update
      formData.append("title", title || "Untitled");
      formData.append("description", description || "");
      formData.append("artistId", id);
      formData.append("topic", selectedSubjects);
      formData.append("tags", tags);

      // Handle file uploads
      const newFiles = uploadedFiles.filter(
        (file) => file.file instanceof File
      );
      const existingFiles = uploadedFiles.filter(
        (file) => !(file.file instanceof File)
      );

      if (newFiles.length > 0) {
        newFiles.forEach((file, index) => {
          formData.append("files", file.file);
          formData.append("fileDescriptions", file.caption);
          formData.append("fileTypes", file.type);
        });
      }

        // For updating, include existing file URLs
        if (existingFiles.length > 0) {
          formData.append(
            "existingFiles",
            JSON.stringify(
              existingFiles.map((file) => ({
                fileUrl: file.preview,
                fileType: file.type,
                description: file.caption,
              }))
            )
          );
        }

      // Handle thumbnail
      if (thumbnail && thumbnail instanceof File) {
        formData.append("thumbnail", thumbnail);
      } else if (preview) {
        formData.append("existingThumbnail", preview);
      }

      // Update existing artwork
      const result = await dispatch(
        updateArtwork({
          artworkId,
          formData,
        })
      ).unwrap();

      console.log(result);

      dispatch(
        showNotification({
          type: "success",
          message: artworkId
            ? "Artwork updated successfully"
            : "Artwork published successfully",
        })
      );

      setTimeout(() => {
        dispatch(hideNotification());

      }, 3000);

    } catch (error) {

        console.log(error);
      dispatch(
        showNotification({
          type: "error",
          message: artworkId
            ? "Artwork update failed"
            : "Artwork publish failed",
        })
      );
      setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-bg-df text-gray-200   min-h-screen p-8">
      <main className="flex ">
        <div className="w-full  pr-8  ">
          {/* Title Input */}
          <div className="text-3xl font-bold mb-4">
            <label className="block text-gray-300 mb-4" htmlFor="artwork-title">
              {title ? title : "Untitled"}
            </label>

            <div className=" w-full bg-[#4e4e5c] border-gray-700 rounded-sm pb-1">
              <label
                className="block text-gray-300 text-sm font-semibold p-1 pb-2 bg-[#303034] pl-4 "
                htmlFor="artwork-title"
              >
                Artwork Title
              </label>
              <input
                className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-sm w-[98%] placeholder-gray-500 m-2 p-2 "
                id="artwork-title"
                type="text"
                placeholder="What is your artwork called?"
                onChange={handleTitleChange}
              />
            </div>
          </div>

          {/*Upload comp  */}
          <div
            className={`  border-2 border-dashed border-gray-700 p-6 mb-4 ${
              isDragActive ? "bg-gray-700" : "bg-bg-df"
            }`}
          >
            <div className="flex flex-col ">
              <p className=" flex justify-center mb-4 ">What you can upload</p>
              <div className="flex space-x-4 mb-8 justify-around pb-2 border-b-2 border-gray-500 ">
                {uploadOptions.map((option) => (
                  <button
                    key={option.name}
                    className="flex flex-col items-center  p-2 rounded"
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-sm">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div {...getRootProps()} className={`  p-10   `}>
              <input {...getInputProps()} />
              <div className="text-center">
                <p
                  className="bg-gray-800  text-gray-200 font-semibold py-2 px-8 rounded mb-2 opacity-70"
                //   onClick={open}
                disabled
                >
                  ⬆️ Upload media files
                </p>
                <p className="text-gray-500">or drag and drop here</p>
                {isDragActive ? (
                  <p className="text-blue-500">Drop the files here ...</p>
                ) : (
                  <p className="text-gray-500">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* artwork pre upload */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded">
                {file.type === "image" ? (
                  <img
                    src={file.preview}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-48 object-cover mb-2"
                  />
                ) : file.type === "video" ? (
                  <video
                    src={file.preview}
                    className="w-full h-48 object-cover mb-2"
                    controls
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-700 mb-2">
                    Unsupported file type
                  </div>
                )}
                <textarea
                  placeholder="Caption"
                  className="w-full bg-gray-700 rounded center"
                  value={file.caption}
                  onChange={(e) => handleCaptionChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <textarea
            placeholder="Artwork Description"
            className="w-full bg-gray-800 p-2 rounded mb-4 h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* tag */}
          <div className="mb-4">
            <div className=" w-full bg-[#303034] border-gray-700 rounded-t-sm pb-1">
              <label
                className=" text-gray-300 text-sm font-semibold p-1 py-1  pl-4 "
                htmlFor="artwork-title"
              >
                Categorization
              </label>
            </div>
            <div className="p-4 bg-gray-900 text-white rounded-b-lg">
              <div className="bg-gray-800 border border-yellow-400 p-4 rounded-md mb-4">
                <h3 className="text-yellow-400 mb-2">
                  Want to get more visibility?
                </h3>
                <p className="text-gray-400">
                  Properly categorizing your project will help to increase its
                  discoverability and visibility towards potential clients,
                  recruiters and fans.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Medium</h3>
                <p className="text-sm text-gray-400 mb-2">
                  What mediums did you use to create this project? (Choose up to
                  3)
                </p>
                <div className="flex flex-wrap gap-2">
                  {mediumOptions.map((medium) => (
                    <button
                      key={medium}
                      onClick={() => handleMediumToggle(medium)}
                      className={`px-3 py-2 text-sm rounded border border-gray-600 ${
                        selectedMediums.includes(medium)
                          ? "bg-gray-700"
                          : "bg-transparent"
                      } ${
                        selectedMediums.length >= 3 &&
                        !selectedMediums.includes(medium)
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      disabled={
                        selectedMediums.length >= 3 &&
                        !selectedMediums.includes(medium)
                      }
                    >
                      {medium}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Subject Matter</h3>
                <p className="text-sm text-gray-400 mb-2">
                  How would you categorize this work? (Choose up to 3)
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedSubjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => handleSubjectRemove(subject)}
                      className="px-3 py-2 text-sm rounded border border-gray-600 bg-gray-700  cursor-pointer"
                    >
                      {subject} <span className="ml-2">×</span>
                    </button>
                  ))}
                </div>
                <div className="relative" ref={subjectInputRef}>
                  <input
                    type="text"
                    placeholder="Choose subject matter"
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    onFocus={() => setShowSubjectSuggestions(true)}
                  />
                  {showSubjectSuggestions && (
                    <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-600 rounded max-h-60 overflow-y-auto">
                      {subjectMatterOptions
                        .filter(
                          (subject) => !selectedSubjects.includes(subject)
                        )
                        .map((subject) => (
                          <div
                            key={subject}
                            className="p-2 cursor-pointer flex justify-between items-center hover:bg-gray-700"
                            onClick={() => handleSubjectAdd(subject)}
                          >
                            <span>{subject}</span>
                            <span>+</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Software Used</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Add the software you used to create the project. If you used
                  any AI software, please include it here.
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {software.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSoftwareRemove(s)}
                      className="px-3 py-2 text-sm rounded border border-gray-600 bg-gray-700 cursor-pointer"
                    >
                      {s} <span className="ml-2">×</span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Enter the software used here"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSoftwareAdd(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Use tags to add more information.
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => handleTagRemove(tag)}
                      className="px-3 py-2 text-sm rounded border border-gray-600 bg-gray-700 text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a new tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddTag();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
        {/* right bar */}
        <aside className="w-1/3 mt-12">
          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="text-xl mb-2">Publishing Options</h3>

            <button
              className="bg-cyan-400 text-white px-4 py-2 rounded w-full"
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
          {/* thumbnail */}
          <div className="">
            <div className="p-4 bg-gray-900 text-white rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">Project Thumbnail</h3>
              <div
                className="relative w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex justify-center items-center bg-gray-800 cursor-pointer hover:border-gray-500"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <p>Upload or drag & drop image</p>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleThumbnailChange}
                  accept="image/*"
                />
              </div>

              {thumbnail && (
                <div className="mt-4 flex space-x-4">
                  <button className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500">
                    Crop
                  </button>
                  <button className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-500">
                    Upload
                  </button>
                </div>
              )}

              {thumbnail && (
                <button
                  className="mt-4 px-4 py-2 bg-red-600 rounded text-white hover:bg-red-500"
                  onClick={handleRemoveThumbnail}
                >
                  Remove custom thumbnail
                </button>
              )}
            </div>{" "}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ArtworkForm;
