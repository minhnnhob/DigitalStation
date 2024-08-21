import { Link } from "react-router-dom";
import { logout } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const {loggedIn} = useSelector((state) => state.user);
  const {email} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    console.log(email);
  };

  // Use the 'user' variable to conditionally render components or perform other actions based on the user's state

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {loggedIn ? (
            <div>
              <span>{loggedIn ? email : ""}</span>
              <button onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Log in</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
