const express = require('express');
const { createWorkout,
    getWorkouts,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
 } = require('../controllers/workoutController');

const router = express.Router();

//GET all 
router.get('/', getWorkouts);

//GET by id
router.get('/:id', getWorkoutById);

//POST
router.post('/', createWorkout);

//Delete
router.delete('/:id', deleteWorkout);

//Update
router.patch('/:id', updateWorkout);

module.exports = router;