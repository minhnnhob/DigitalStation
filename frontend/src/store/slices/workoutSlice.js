import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  workouts: [],
  error: "",
};

const fetchWorkouts = createAsyncThunk("workout/fetchWorkouts", async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/workouts/", {
      withCredentials: true,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const workoutState = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addWorkout: (state, action) => {
      state.workouts = [action.payload, ...state.workouts];
    },
    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter(
        (workout) => workout._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkouts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWorkouts.fulfilled, (state, action) => {
      state.loading = false;
      state.workouts = action.payload;
      state.error = "";
    });
    builder.addCase(fetchWorkouts.rejected, (state, action) => {
      state.loading = false;
      state.workouts = [];
      state.error = action.error.message;
    });
  },
});

export default workoutState.reducer;
export const { addWorkout, deleteWorkout } = workoutState.actions;
export { fetchWorkouts };
