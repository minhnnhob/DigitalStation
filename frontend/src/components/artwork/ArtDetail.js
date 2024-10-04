import { useNavigate } from "react-router-dom";

const ArtCard = ({ artwork }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/artwork/${artwork._id}`);
  };


  return (
    <div
      className="bg-[#1c1c1c] rounded-sm overflow-hidden shadow-lg transition-transform transform hover:translate-y-[-5px] hover:shadow-xl"
      onClick={goToDetail}
    >
      <div className="w-full h-[200px] overflow-hidden">
        <img
           src={artwork.thumbnail}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ArtCard;
