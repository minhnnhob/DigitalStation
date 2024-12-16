import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { register } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const userError = useSelector((state) => state.user?.error);
  console.log("error", userError);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const respone = await dispatch(register(formData)).unwrap();

      console.log("response", respone);

      if (respone.message) {
        toast.success("Please confirm your email");
        navigate("/login");
      }
    } catch (error) {
      toast.error("An error occurred during registration." + userError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container bg-gray-900 text-white p-6 rounded-xl max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4">Personal Profile</h1>

      <div className="step">
        <h2 className="text-xl font-semibold mb-2">Step 1: Register</h2>

        <div className="mb-4">
          <label className="block text-lg">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
            required
          >
            <option value="">Select Role</option>
            <option value="artist">Artist</option>
            <option value="studio">Studio/HR</option>
          </select>
        </div>

        <div className="mb-4">
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
