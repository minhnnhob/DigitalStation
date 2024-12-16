import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/userSlice";
import { MdAirlineSeatIndividualSuite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../store/slices/userSlice";

const Login = () => {
  const userError  = useSelector((state) => state.user?.error)
  console.log("error", userError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currUser = { email, password };

    try {
      await dispatch(login(currUser));
    }catch (error) {
      if (error) {
        return alert("Login failed: " + userError);
      }
      if (error) {
        return alert("Failed to fetch user: " + userError);
      }
  
    }
   
    try {
      const user = await dispatch(fetchCurrentUser());
      if (user.payload?.role === "admin") {
        navigate("/admin");
      } else if (
        user.payload.role === "artist" ||
        user.payload.role === "studio"
      ) {
        navigate("/");
      } else {
        return alert("Hello! I am an alert box hehehehehehehheheheehheh!!");
      }
    }catch(error){
      return alert("Failed to fetch user: " + userError);
    }
    // const user = await dispatch(fetchCurrentUser());
    // // if(user.payload?.role )
    // console.log("user", user.payload?.role);
    // if (user.payload?.role === "admin") {
    //   navigate("/admin");
    // } else if (
    //   user.payload.role === "artist" ||
    //   user.payload.role === "studio"
    // ) {
    //   navigate("/");
    // } else {
    //   return alert("Hello! I am an alert box hehehehehehehheheheehheh!!");
    // }
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
        {/* {error && <div className="error">{error}</div>} */}

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
