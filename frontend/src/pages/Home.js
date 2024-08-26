import { useSelector, useDispatch } from "react-redux";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { fetchWorkouts } from "../store/slices/workoutSlice";
import { useEffect } from "react";
import AuthorizedPages from "../components/authorization/AuthorizedPages";

const Home = () => {
  const { workouts } = useSelector((state) => state.workout);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWorkouts());

    // eslint-disable-next-line
  }, []);

  return (
    <AuthorizedPages>
    <div className="home">
      <div className="workouts">
        {workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
    </AuthorizedPages>
  );
};
export default Home;
