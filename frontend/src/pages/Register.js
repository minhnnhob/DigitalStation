import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/slices/userSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { email, password, role: "artist" };
    try {
      await dispatch(register(newUser)).unwrap();
      console.log("User registered successfully:", newUser);
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register</h3>
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

      <button>Register</button>
    </form>
  );
};

export default Register;
