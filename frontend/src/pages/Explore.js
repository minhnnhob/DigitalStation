import ArtworkList from "../components/artwork/ArtworkList";
import { useState } from "react";
import { useSelector } from "react-redux";
import ArtworkForUser from "../components/artwork/ArtworkForUser";

const Explore = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div>
        {loggedIn ?<ArtworkForUser/>  : <ArtworkList />}
      </div>
    </div>
  );
};
export default Explore;
