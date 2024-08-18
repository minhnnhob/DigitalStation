import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addWorkout } from "../store/slices/workoutSlice";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/workouts",
        workout
      );
      console.log(response.data);
      if (response.status === 200) {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        dispatch(addWorkout(response.data));
      }
    } catch (error) {
      setError("Something went wrong");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }

    
  };

 

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label htmlFor="">Excersize Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="">Load</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label htmlFor="">Reps</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
