import { Link } from "react-router-dom";
import { logout } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const  loggedIn  = useSelector((state) => state.user.loggedIn);
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
    // loggedIn = false;
    // Perform any additional actions after logout, such as redirecting to a different page or clearing local storage
  };


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
