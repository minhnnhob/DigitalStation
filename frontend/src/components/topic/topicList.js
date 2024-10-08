import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchArtworks } from "../../store/slices/artWorkSlice";

const TopicList = ({ topics }) => {
  const dispatch = useDispatch();
  const [selectedTopic, setSelectedTopic] = useState();

  const handleTopicChange = (e) => {
    const topicName = e.target.getAttribute("name");
    console.log("Selected Topic:", topicName);
    setSelectedTopic(topicName);

    dispatch(fetchArtworks({ topic: e.target.id }));
  };

  useEffect(() => {
    if (selectedTopic !== null) {
      console.log("Selected Topic Updated:", selectedTopic);
      // Perform any additional actions here
    }
  }, [selectedTopic]);

  return (
    <>
      <div className="flex items-center">
        <div className="mx-2">
          <h1
            className=" p-3 px-4 rounded-lg bg-bg-pf hover:cursor-pointer "
            onClick={handleTopicChange}
            id=""
          >
            All
          </h1>
        </div>
        <ul className="flex ">
          <li></li>
          {topics.map((topic) => (
            <li key={topic._id}>
              <div
                className="mx-2 p-3 rounded-lg bg-bg-pf hover:cursor-pointer "
                onClick={handleTopicChange}
                id={topic._id}
                name={topic.name}
              >
                {topic.name}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="py-4 text-3xl font-black">{selectedTopic}</div>
    </>
  );
};
export default TopicList;
