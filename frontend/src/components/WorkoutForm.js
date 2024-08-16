import { useState } from "react";

const WorkoutForm = () => {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };
        const response = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(workout),
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.message);
            console.log(json.message);
        }

        if(response.ok){
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            console.log(json);
        }
    }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label for="">Excersize Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label for="">Load</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label for="">Reps</label>
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