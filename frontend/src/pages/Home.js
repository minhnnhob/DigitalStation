import { useEffect, useState } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setWorkouts(data);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};
export default Home;
