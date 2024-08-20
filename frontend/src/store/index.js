import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./slices/workoutSlice";
import userReducer from "./slices/userSlice";

// });

const store = configureStore({
  reducer: {
    workout: workoutReducer,
    user: userReducer,
  },
});

export default store;
