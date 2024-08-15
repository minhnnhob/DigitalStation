const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({message: 'Error getting workouts: '+error.message});
    }
};

// get by id
const getWorkoutById = async (req, res) => {
    const id = req.params.id;
   
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Workout not found'});
    }

    const workout = await Workout.findById(id);

    if(!workout) {
        return res.status(404).json({message: 'Workout not found'});
    }
    res.status(200).json(workout);
}
// create
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    try {
        const newWorkout = await Workout.create({title, reps, load});
        res.status(200).json(newWorkout);
        newWorkout.save();
    } catch (error) {
        res.status(400).json({message: 'Error creating workout: '+error.message});
    }
};
// delete
const deleteWorkout = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Workout not found'});
    }

    const workout = await Workout.findOneAndDelete(id);

    await Workout.findByIdAndDelete(id);
    res.status(200).json({message: 'Workout deleted'});
};

// update

const updateWorkout = async (req, res) => {
    const id = req.params.id;
    const {title, reps, load} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Workout not found'});
    }

    const updatedWorkout = {title, reps, load, _id: id};
    await Workout.findByIdAndUpdate(id, updatedWorkout, {new: true});
    res.status(200).json(updatedWorkout);
};


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkoutById,

    deleteWorkout,
    updateWorkout

}
