import { Link } from "react-router-dom";
import { logout } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const NavBar = () => {
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";

    // Perform any additional actions after logout, such as redirecting to a different page or clearing local storage
  };
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  useEffect(() => {}, [token]);

  // Use the 'user' variable to conditionally render components or perform other actions based on the user's state

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {token ? (
            <div>
              <span>{token ? email : ""}</span>
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
