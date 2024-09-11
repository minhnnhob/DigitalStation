import AuthorizedPages from "../components/authorization/AuthorizedPages";
import ArtworkForm from "../components/artwork/ArtworkForm";
import ArtworkList from "../components/artwork/ArtworkList";

const Home = () => {
  return (
    <AuthorizedPages>
      <div style={{ display: "flex",width:"100%" }}>
        <div>
          <ArtworkList />
        </div>
        {/* <div>
          <ArtworkForm />
        </div> */}
      </div>
    </AuthorizedPages>
  );
};
export default Home;
