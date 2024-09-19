import React, { useState, useEffect } from "react";
import ArtworkList from "../components/artwork/ArtworkList";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, fetchUserInfo } from "../store/slices/userSlice";
import { fetchArtwprkOfUser } from "../store/slices/artWorkSlice";
import ArtworkOfUser from "../components/artwork/ArtWorkOfUser";
import RightSidebar from "../components/sideBar/rightSideBar";

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const { id, userInfor } = useSelector((state) => state.user);
  const { artworks, loading } = useSelector((state) => state.artwork);

  const [artworksUser, setArtworksUser] = useState(artworks);
  const [coverPicture, setCoverPicture] = useState(
    userInfor.coverPicture || null
  );

  // console.log(artworks.map((artwork) => console.log(artwork)));

  useEffect(() => {
    if (userInfor && artworks) {
      setCoverPicture(userInfor.coverPicture || "");
      setArtworksUser(artworks);
    }
  }, [dispatch, userInfor, artworks]);

  useEffect(() => {
    if (!id) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserInfo(id));
      dispatch(fetchArtwprkOfUser(id));
    }
    setArtworksUser(artworks);
  }, [dispatch, id]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY); // Debugging scroll position
      if (window.scrollY > 90) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="flex gap-1  justify-end w-full  ">
      <div className=" h-full">
        <div
          className="  h-60 w-full  bg-center bg-cover rounded-[16px]  mb-[16px] "
          style={{
            backgroundImage: `url(${coverPicture})`,
          }}
        ></div>

        <div className="w-full h-3/5   ">
          <h2 className="text-3xl font-bold">Portfolio</h2>
          <ArtworkOfUser artworksUser={artworksUser} className="z-1" />
        </div>
      </div>
      {/* cover image */}

      <div
        className={` h-full ml-2 rounded-[16px] ${
          isCollapsed ? "w-[6%]" : "w-[38%]"
        }`}
      >
        <RightSidebar
          userInfor={userInfor}
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
        />
      </div>

      {/* profile image */}
    </div>
  );
};

export default PortfolioPage;
