import { useDispatch } from "react-redux";
import { deleteWorkout } from "../store/slices/workoutSlice";
import axios from "axios";
const WorkoutDetails = ({ workout }) => {
  const dispatch = useDispatch();
  const handleClick =  (e) => {
    e.preventDefault();
    const id = workout._id;
    try{
      const response = axios.delete(`http://localhost:4000/api/workouts/${id}`);
      console.log(response.data);
      
      if(response.status === 200){
        dispatch(deleteWorkout(id));
      }

    }catch(error){
      console.log(error);
    }
    
    
  };
  return (
    <div className=" workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps :</strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick} >Delete</span>
    </div>
  );
};
export default WorkoutDetails;
