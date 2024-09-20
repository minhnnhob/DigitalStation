import { useState } from "react";

const ArtworkDetail = ({ artwork, artist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < artwork.files.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 bg-[#121212]">
      {/* Artwork Section */}
      <div className="relative w-full lg:w-2/3 bg-[#1c1c1c]">
        {/* Artwork Image Carousel */}
        <div className="w-full h-[600px] overflow-hidden relative">
          <img
            src={artwork.files[currentImageIndex].fileUrl}
            alt={artwork.title}
            className="object-cover w-full h-full"
          />
          {/* Previous Arrow */}
          {currentImageIndex > 0 && (
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white"
            >
              &#8592;
            </button>
          )}
          {/* Next Arrow */}
          {currentImageIndex < artwork.files.length - 1 && (
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white"
            >
              &#8594;
            </button>
          )}
        </div>

        {/* Artwork Info */}
        <div className="p-4 bg-[#1a1a1a] text-white">
          <h1 className="text-2xl font-semibold">{artwork.title}</h1>
          <p className="mt-2 text-gray-400">{artwork.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-red-500">&#9829;</span>
              <span className="ml-1">{artwork.likesCount} Likes</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-500">&#128065;</span>
              <span className="ml-1">{artwork.viewsCount} Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Information */}
      <div className="mt-4 lg:mt-0 lg:ml-6 w-full lg:w-1/3 bg-[#1c1c1c] p-4 text-white">
        <div className="flex items-center gap-4">
          <img
            src={artist.profileImage}
            alt={artist.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{artist.name}</h2>
            <button className="mt-1 bg-blue-500 text-white px-4 py-1 rounded-sm">
              Follow
            </button>
          </div>
        </div>

        {/* Artwork Actions */}
        <div className="mt-4 flex items-center gap-4">
          <button className="bg-gray-700 px-4 py-2 rounded-md">Like</button>
          <button className="bg-gray-700 px-4 py-2 rounded-md">Share</button>
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
