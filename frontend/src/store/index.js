import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./slices/workoutSlice";
import userReducer from "./slices/userSlice";
import artworkReducer from "./slices/artWorkSlice";
import notificationReducer from "./slices/notificationSlice";
import likeReducer from "./slices/activity/likeSlice";
import topicReducer from "./slices/category/topicSlice";
import tagReducer from "./slices/category/tagSlice";
import jobReducer from "./slices/jobSlice";
import studioReducer from "./slices/studioSlice";
import recruitmentReducer from "./slices/recruitmentSlice";

// });

const store = configureStore({
  reducer: {
    workout: workoutReducer,
    user: userReducer,
    artwork: artworkReducer,
    notification: notificationReducer,
    like: likeReducer,
    topic: topicReducer,
    tag: tagReducer,
    job: jobReducer,
    studio: studioReducer,
    recruitment: recruitmentReducer,
  },
});

export default store;
