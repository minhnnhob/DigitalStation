import React, { useState } from "react";
import { toast } from "react-hot-toast";


const topics = [
  { name: "3D Art", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNwrAbItdESQ7eV0oDXsMRIgPEC1nf-cgCrA&s" },
  { name: "VFX", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNwrAbItdESQ7eV0oDXsMRIgPEC1nf-cgCrA&s" },
  { name: "2D Art", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNwrAbItdESQ7eV0oDXsMRIgPEC1nf-cgCrA&s" },
  { name: "Traditional Art", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNwrAbItdESQ7eV0oDXsMRIgPEC1nf-cgCrA&s" },
  { name: "Digital Art", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNwrAbItdESQ7eV0oDXsMRIgPEC1nf-cgCrA&s" }
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    city: "",
    country: "",
    profilePicture: null,
    interests: [],
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  const toggleInterest = (topic) => {
    setFormData((prevData) => {
      const interests = prevData.interests.includes(topic)
        ? prevData.interests.filter((t) => t !== topic)
        : [...prevData.interests, topic];
      return { ...prevData, interests };
    });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Simulate an API registration request
      const response = await fakeRegisterAPI(formData.email, formData.password);
      if (response.success) {
        setIsRegistered(true);
        toast.success("Registration successful! Proceeding to next step.");
        handleNextStep(); // Move to the next step after successful registration
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    // Handle final submission (e.g., send all data to the backend)
    console.log("Final Submission:", formData);
    toast.success("Your profile is complete! Thank you for registering.");
  };

  // Fake register API function for simulation
  const fakeRegisterAPI = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ success: true });
        } else {
          reject({ success: false });
        }
      }, 1000);
    });
  };

  return (
    <div className="register-container bg-gray-900 text-white p-6 rounded-xl max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4">Personal Profile</h1>

      {step === 1 && (
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
              <option value="hr">HR</option>
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
      )}

      {isRegistered && step === 2 && (
        <div className="step">
          <h2 className="text-xl font-semibold mb-2">Step 2: Basic Information</h2>

          <div className="mb-4">
            <label className="block text-lg">Headline</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="E.g. Freelance artist"
              className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg">Avatar</label>
            <input
              type="file"
              onChange={handleProfilePictureChange}
              accept="image/*"
              className="mt-2"
            />
            {formData.profilePicture && (
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 rounded-full"
              />
            )}
          </div>

          <div className="flex justify-between">
            <button onClick={handlePrevStep} className="bg-gray-700 text-white py-2 px-4 rounded-lg">
              Back
            </button>
            <button onClick={handleNextStep} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Next
            </button>
          </div>
        </div>
      )}

      {isRegistered && step === 3 && (
        <div className="step">
          <h2 className="text-xl font-semibold mb-2">Step 3: Select Your Topics of Interest</h2>

          <div className="grid grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.name}
                className="relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={topic.image}
                  alt={topic.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-xl font-semibold">
                  <label>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.interests.includes(topic.name)}
                      onChange={() => toggleInterest(topic.name)}
                    />
                    <span
                      className={`border-2 border-white rounded-full p-3 transition-all duration-200 ${
                        formData.interests.includes(topic.name) ? "bg-blue-500 border-blue-500" : ""
                      }`}
                    >
                      {formData.interests.includes(topic.name) ? "✔️" : "❌"}
                    </span>
                    {topic.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={handlePrevStep} className="bg-gray-700 text-white py-2 px-4 rounded-lg">
              Back
            </button>
            <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
