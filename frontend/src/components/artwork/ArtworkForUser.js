import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtworkUser } from "../../store/slices/artWorkSlice";
import { showNotification } from "../../store/slices/notificationSlice";
import Loading from "../loading/Loading";
import ArtworkCart from "./ArtDetail";

const ArtworkForUser = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const { artworks, loading, error } = useSelector((state) => state.artwork);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchArtworkUser(id)).unwrap();
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
  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  if (!Array.isArray(artworks) || artworks.length === 0) {
    return <p>No artworks found</p>;
  } else {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0.5 p-2 bg-[#121212]">
        {artworks.map((artwork) => (
          <ArtworkCart key={artwork._id} artwork={artwork} />
        ))}
      </div>
    );
  }
};

export default ArtworkForUser;
