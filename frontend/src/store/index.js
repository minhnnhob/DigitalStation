import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./slices/workoutSlice";
import userReducer from "./slices/userSlice";
import artworkReducer from "./slices/artWorkSlice";
import notificationReducer from "./slices/notificationSlice";

// });

const store = configureStore({
  reducer: {
    workout: workoutReducer,
    user: userReducer,
    artwork: artworkReducer,
    notification: notificationReducer,
  },
});

export default store;
