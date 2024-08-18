import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './slices/workoutSlice';

// });

const store = configureStore({
    reducer: {
        workout: workoutReducer,
    },
});

// module.exports = store;
export default store;