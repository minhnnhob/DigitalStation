import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteArtwork } from "../../store/slices/artWorkSlice";


const ArtCard = ({artwork}) => {

    
        // const dispatch = useDispatch();
      
        // const handleDelete = async () => {
        //   const artistId = artwork.artist._id; // Assuming artist ID is within the artwork object
        //   const artworkId = artwork._id; // Get artwork ID directly from the artwork object
      
        //   try {
        //     const response = await axios.delete(
        //       `http://localhost:4000/api/artworks/${artistId}/${artworkId}`,
        //       {
        //         withCredentials: true,
        //       }
        //     );
      
        //     if (response.status === 200) {
        //       dispatch(deleteArtwork(artworkId)); // Dispatch with the artwork ID
        //     }
        //   } catch (error) {
        //     console.log("Error deleting artwork:", error);
        //   }
        // };
      
        return (
          <div className="bg-[#1c1c1c] rounded-sm overflow-hidden shadow-lg transition-transform transform hover:translate-y-[-5px] hover:shadow-xl">
            <div className="w-full h-[200px] overflow-hidden">
              <img
                src={artwork.files[0]?.fileUrl}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform transform hover:scale-105"
              />
            </div>
          </div>
        );
      
};

export default ArtCard;