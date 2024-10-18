import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/userSlice";
import { MdAirlineSeatIndividualSuite } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const error = useSelector((state) => state.user.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currUser = { email, password };
    await dispatch(login(currUser));
    const result = await dispatch(login(currUser));
    console.log(result.payload.userType);

    if (result.payload.userType === "admin") {
      navigate("/admin");
    } else if (result.payload.userType === "artist") {
      navigate("/");
    } else if (result.payload.userType === "studio") {
      navigate("/");
    } else {
      return alert("Hello! I am an alert box hehehehehehehheheheehheh!!");
    }
  };

  return (
    <div className="login-container ">
      <div className="login-header">
        {/* <img
        // eslint-disable-next-line no-octal-escape
        src="C:\Users\Minh\Desktop\meme\395607885_328163166489231_1975222285711124102_n.jpg"
        alt="Logo"
        className="login-logo"
      /> */}
        <MdAirlineSeatIndividualSuite />
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign In</h2>
        {/* 
      <div className="social-login">
        <button type="button" className="social-button epic-button">
          Sign In with Epic Games
        </button>
        <button type="button" className="social-button google-button">
          Sign In with Google
        </button>
        <button type="button" className="social-button facebook-button">
          Sign In with Facebook
        </button>
      </div>

      <div className="divider">
        <span>Or</span>
      </div> */}

        <label htmlFor="email" className="login-label">
          Email address
        </label>
        <input
          type="email"
          id="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button">Login</button>
        {error && <div className="error">{error}</div>}

        <div className="login-footer">
          <a href="/forgot-password" className="forgot-password">
            Forgot password?
          </a>
        </div>
        <div className=" flex justify-center items-center">
          <p> Don't have an account?</p>
          <a href="/register">{"register"}</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
