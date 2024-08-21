import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { login } from "../store/slices/userSlice";

const Login = () => {
  const error = useSelector((state) => state.user.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Newuser = { email, password };
    await dispatch(login(Newuser));
    console.log(Newuser);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
