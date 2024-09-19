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
    if (userInfor) {
      setCoverPicture(userInfor.coverPicture || "");
    }
  }, [dispatch, userInfor, artworks]);
  useEffect(() => {
    if (loading === false) {
      setArtworksUser(artworks);
    }
  }, [loading]);
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
      if (window.scrollY > 300) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  return (
    // <div className="flex min-h-screen min-w-sceen justify-center ">
    //   {/* Left side for portfolio */}
    //   <div
    //     className={`w-full ${
    //       isCollapsed ? "lg:w-[80%]" : "lg:w-[75%]"
    //     } transition-all duration-300`}
    //   >
    //     <div className="p-6">
    //       {/* Portfolio content goes here */}
    //       <div className="text-3xl font-bold">Portfolio</div>
    //       {/* Placeholder for portfolio images */}
    //       {/* <div className="mt-4 h-[500px] bg-gray-300"></div> */}
    //       <ArtworkList />
    //     </div>
    //   </div>

    //   {/* Right side for sidebar */}
    //   <div
    //     className={`flex justify-center h-screen bg-gray-900 text-white p-4 ${
    //       isCollapsed ? "w-[80px]" : "w-[20%]"
    //     } transition-all duration-300`}
    //   >
    //     {/* Profile Information */}
    //     {!isCollapsed ? (
    //       <div>
    //         <div className="flex flex-col items-center">
    //           {/* Profile Image */}
    //           <img
    //             src="profile-picture-url" // Replace with actual profile picture URL
    //             alt="Profile"
    //             className="w-24 h-24 rounded-full border-2 border-gray-600"
    //           />
    //           {/* Name */}
    //           <h2 className="text-xl font-bold mt-4">Minh Nguyễn</h2>
    //           {/* Subtitle or Role */}
    //           <p className="text-gray-400">Hobb</p>
    //         </div>

    //         {/* Location */}
    //         <div className="mt-6 text-center">
    //           <p className="text-sm flex items-center justify-center">
    //             <span className="material-icons text-gray-400 mr-2">
    //               location_on
    //             </span>
    //             Hanoi, Vietnam
    //           </p>
    //         </div>

    //         {/* Edit Profile Button */}
    //         <div className="mt-6 flex justify-center">
    //           <button className="px-4 py-2 bg-gray-700 text-sm rounded hover:bg-gray-600 flex items-center">
    //             <span className="material-icons mr-2">edit</span> Edit profile
    //           </button>
    //         </div>

    //         {/* Additional Information */}
    //         <div className="mt-6">
    //           {/* About Info */}
    //           <p className="text-center text-gray-400">hobb</p>

    //           {/* Interested In */}
    //           <div className="mt-4 text-center">
    //             <p className="text-gray-400">Interested In</p>
    //             <button className="px-3 py-1 bg-gray-800 text-sm rounded mt-2">
    //               Full Time Employment
    //             </button>
    //           </div>

    //           {/* Contact Information */}
    //           <div className="mt-6 text-center">
    //             <p className="text-gray-400">Contact / Email Address</p>
    //             <p className="mt-2">*********@email.com</p>
    //             <button className="text-blue-500 mt-2">Reveal email</button>
    //           </div>

    //           {/* Followers & Following */}
    //           <div className="mt-6 text-center">
    //             <p className="text-blue-500">0 Followers</p>
    //             <p className="text-blue-500 mt-2">0 Following</p>
    //           </div>

    //           {/* Help Link */}
    //           <div className="mt-6 text-center">
    //             <p className="text-gray-500">ArtStation Help</p>
    //           </div>
    //         </div>

    //         {/* Collapse Button */}
    //         <div className="mt-8 flex justify-center">
    //           <button
    //             onClick={() => setIsCollapsed(true)}
    //             className="text-gray-400 text-2xl hover:text-white"
    //           >
    //             ➡️
    //           </button>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="flex justify-center">
    //         <button
    //           onClick={() => setIsCollapsed(false)}
    //           className="text-gray-400 text-2xl hover:text-white"
    //         >
    //           ⬅️
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="flex gap-1  justify-center bg-blue-900 w-full  ">
      <div className="w-9/12 h-full">
        <div
          className="  h-60 w-full  bg-center bg-cover rounded-[16px]  mb-[16px] "
          style={{
            backgroundImage: `url(${coverPicture})`,
          }}
        ></div>

        <div className="w-full h-3/5   ">
          <h2 className="text-3xl font-bold">Portfolio</h2>
          <ArtworkOfUser artworksUser={artworksUser} />
        </div>
      </div>
      {/* cover image */}

      <div></div>
      <div className="w-1/4 h-full bg-purple-800 rounded-[16px] ">
          <RightSidebar />
      </div>

      {/* profile image */}
    </div>
  );
};

export default PortfolioPage;
