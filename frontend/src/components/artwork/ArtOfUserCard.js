import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

const ArtOfUserCard = ({ artwork, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    onDelete(artwork._id);
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-artwork/${artwork._id}`);
    console.log("Edit artwork", artwork._id);
  };

  return (
    <div
      className="relative bg-[#1c1c1c] rounded-sm overflow-hidden shadow-lg transition-transform transform hover:translate-y-[-5px] hover:shadow-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={artwork.thumbnail}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform transform hover:scale-105"
        />
      </div>

      {isHovered && (
        <div className="action-icons absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4">
          <button
            onClick={handleEdit}
            className="text-white bg-gray-800 bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-all"
          >
            <Edit size={24} />
          </button>
          <button
            onClick={handleDelete}
            className="text-white bg-red-500 bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-all"
          >
            <Trash2 size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtOfUserCard;
