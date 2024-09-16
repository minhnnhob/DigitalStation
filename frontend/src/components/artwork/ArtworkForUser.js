import { useEffect }from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchArtworkUser } from "../../store/slices/artWorkSlice";
import { showNotification } from "../../store/slices/notificationSlice";
import Loading from "../loading/Loading";
import ArtworkCart from "./ArtDetail";



const ArtworkForUser = ({ artwork }) => {
    const dispatch = useDispatch();

    const {artworks,loading,error} = useSelector((state) => state.artwork);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchArtworkUser()).unwrap();
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

    if (artworks === null) {
        return <p>No artworks found</p>;
    }
    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="grid grid-cols-[repeat(5,_minmax(200px,_2fr))] gap-0.5 p-2 bg-[#121212]">
            {artworks.map((artwork) => (
                <ArtworkCart key={artwork._id} artwork={artwork} />
            ))}
        </div>
    );
}

export default ArtworkForUser;