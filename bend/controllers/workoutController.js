const WorkoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')

///get all wo

const getAllWorkouts = async (req, res) => {
    const workouts = await WorkoutModel.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a singlw wo
const getWorkout = async (req, res) => {
    const {id}  = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await WorkoutModel.findById(id)

    if(!workout){
        return res.status(404).json({error: "Workout does not exist"})
    }
    
        res.status(200).json(workout)
}


//create new wo

const createWorkout = async (req, res) => {
    const {title, load, reps} =  req.body;

    let emptyFields = []

  if(!title){
    emptyFields.push(title)
  }
  if(!load){
    emptyFields.push(load)
  }

  if(!reps){
    emptyFields.push(reps)
  }

  if (emptyFields.length >0 ){
    return res.status(400).json({error: "PLease fill in all the fields", emptyFields})
  }


    try {
        const newWorkout = await WorkoutModel.create({title, load, reps })
        res.status(200).json(newWorkout)

    } catch (error){
        res.status(400).json({error: error.message})
    }
}
//delete WO

const deleteWorkout = async (req, res) => {
    const {id}  = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workoutToDelete = await WorkoutModel.findByIdAndDelete({_id: id})
    if(!workoutToDelete){
        return res.status(404).json({error: "Workout does not exist"})
    }
    
        res.status(200).json(workoutToDelete)
}

//update wo
const updateWorkout = async (req, res) => {
    const {id}  = req.params;
 
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workoutToUpdate = await WorkoutModel.findByIdAndUpdate({_id: id}, {...req.body})

    if(!workoutToUpdate){
        return res.status(404).json({error: "Workout does not exist"})
    }
    
        res.status(200).json(workoutToUpdate)
}


module.exports = {createWorkout, getWorkout, getAllWorkouts, deleteWorkout, updateWorkout }