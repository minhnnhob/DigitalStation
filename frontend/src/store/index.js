import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./slices/workoutSlice";
import userReducer from "./slices/userSlice";
import artworkReducer from "./slices/artWorkSlice";

// });

const store = configureStore({
  reducer: {
    workout: workoutReducer,
    user: userReducer,
    artwork: artworkReducer,
  },
});

export default store;
