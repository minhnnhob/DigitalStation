import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistInfor } from "../store/slices/userSlice";
import { fetchArtwprkOfUser } from "../store/slices/artWorkSlice";
import ArtworkOfUser from "../components/artwork/ArtWorkOfUser";
import RightSidebar from "../components/sideBar/rightSideBar";
import { useParams } from "react-router-dom";
const Portfolios = () => {
  const dispatch = useDispatch();
  const { id, artistInfor } = useSelector((state) => state?.user);
  const { artworks, loading } = useSelector((state) => state.artwork);

  const artitsId = useParams().id;

  const [artworksUser, setArtworksUser] = useState(artworks);
  const [coverPicture, setCoverPicture] = useState(
    artistInfor.coverPicture || null
  );

  // console.log(artworks.map((artwork) => console.log(artwork)));
  useEffect(() => {
   
      dispatch(fetchArtistInfor(artitsId));
      dispatch(fetchArtwprkOfUser(artitsId));
    
  }, [dispatch, artitsId]);

  useEffect(() => {
    if (artistInfor) {
      setCoverPicture(artistInfor.coverPicture || "");
    }
  }, [artistInfor]);

  useEffect(() => {
    if (artworks) {
      setArtworksUser(artworks);
    }
  }, [artworks]);


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
      <div className=" h-full w-full">
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
          userInfor={artistInfor}
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
          onUser={artitsId}
        />
      </div>

      {/* profile image */}
    </div>
  );
};

export default Portfolios;
