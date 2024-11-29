import React, { useState } from "react";
import { PlusIcon, EditIcon, TrashIcon, EyeIcon, XIcon } from "lucide-react";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createNewTopic,
  fetchAllTopics,
  deleteTopic,
  updateTopic,
} from "../../store/slices/category/topicSlice";
import { useSelector } from "react-redux";
import { createTag } from "../../store/slices/category/tagSlice";

const AdminTopic = () => {
  const dispatch = useDispatch();

  const topicList = useSelector((state) => state.topic.topics);

  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState({
    name: "",
    slug: "",
    imageUrl: "",
    description: "",
    tags: [],
  });
  const [modalMode, setModalMode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTopics());
  }, [dispatch]);

  useEffect(() => {
    setTopics(topicList);
    // setCurrentTopic({}); // Reset current topic
  }, [topicList, ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(currentTopic);
    setCurrentTopic((prev) => ({
      ...prev,
      [name]: value,
      slug:
        name === "name" ? value.toLowerCase().replace(/\s+/g, "-") : prev.slug,
    }));
  };

  const openModal = (mode, topic = null) => {
    setModalMode(mode);
    setIsModalOpen(true);
    if (topic) {
      setCurrentTopic({
        ...topic, // Set current topic with the topic data
        tags: topic.tags || [], // Ensure tags are set correctly
      });
    } else {
      setCurrentTopic({
        name: "",
        slug: "",
        imageUrl: "",
        description: "",
        tags: [],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(modalMode);
    console.log(currentTopic);
    const updatedTags = currentTopic.tags.length > 0 ? currentTopic.tags : undefined;
    
    const formData = new FormData();
    formData.append("name", currentTopic.name);
    formData.append("slug", currentTopic.slug);
    formData.append("description", currentTopic.description);

    formData.forEach((value, key) => {});

    if (updatedTags) {
      formData.append("tags", updatedTags);
    }
  

    if (currentTopic.imageUrl) {
      formData.append("imageUrl", currentTopic.imageUrl);
    }

    try {
      if (modalMode === "create") {
        const response = await dispatch(createNewTopic(formData)).unwrap();
        setTopics([...topics, response]);
      } else if (modalMode === "edit") {
        console.log(currentTopic);
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        const response = await dispatch(updateTopic({ id: currentTopic._id, data:formData })
        ).unwrap();
        setTopics(
          topics.map((t) => (t._id === currentTopic._id ? response : t))
        );
      }
      setIsModalOpen(false);
     
      setNewTag("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTopic(id)).unwrap();
      setTopics(topics.filter((t) => t._id !== id));
      console.log("Topic deleted successfully");
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag.toLowerCase().replace(/[\s/]+/g, "-")]);
      setCurrentTopic((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      console.log(currentTopic);
      
      setNewTag("");
    }
    dispatch(createTag(newTag));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setCurrentTopic((prev) => ({
        ...prev,
        imageUrl: file,
      }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-bg-pf shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-white">Topic Management</h2>
          <button
            onClick={() => openModal("create")}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="mr-2" /> Create Topic
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="border rounded-lg  p-4 bg-opacity-30 shadow-sm hover:shadow-md transition-shadow bg-cover bg-center  "
            >
              <h3 className="font-semibold text-lg mb-2 overflow-hidden whitespace-nowrap">{topic.name}</h3>
              <p className="text-gray-600 mb-4">{topic.description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => openModal("view", topic)}
                  className="text-blue-500 hover:bg-blue-50 p-2 rounded"
                >
                  <EyeIcon />
                </button>
                <button
                  onClick={() => openModal("edit", topic)}
                  className="text-green-500 hover:bg-green-50 p-2 rounded"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(topic._id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {modalMode === "create"
                    ? "Create Topic"
                    : modalMode === "edit"
                    ? "Edit Topic"
                    : "View Topic"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XIcon />
                </button>
              </div>

              <form  className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Topic Name"
                  value={currentTopic.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  disabled={modalMode === "view"}
                />
                <input
                  type="text"
                  name="slug"
                  placeholder="Slug"
                  value={currentTopic.slug}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  disabled={modalMode === "view"}
                />
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="border p-2 mr-2"
                  hidden={modalMode === "view"}
                />
                {currentTopic.imageUrl && (
                  <img
                    src={currentTopic.imageUrl}
                    alt="Topic"
                    className="max-w-32 max-h-32 object-cover mb-2"
                  />
                )}
                <textarea
                  name="description"
                  placeholder="Description"
                  value={currentTopic.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  disabled={modalMode === "view"}
                ></textarea>

                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {currentTopic.tags.map((tag) => (
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
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white cursor-pointer"
                      hidden={modalMode === "view"}
                    >
                      Add Tag
                    </button>
                  </div>
                </div>

                {modalMode !== "view" && (
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {modalMode === "create" ? "Create" : "Update"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopic;
