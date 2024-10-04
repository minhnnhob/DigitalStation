const express = require('express');
const { createWorkout,
    getWorkouts,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
 } = require('../controllers/workoutController');
const {requireAuth} = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);

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