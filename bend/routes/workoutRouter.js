const express = require('express')

const router = express.Router();


const { 
    createWorkout, getWorkout, getAllWorkouts, deleteWorkout, updateWorkout 
        } = require('../controllers/workoutController')

//to get all WO
router.get('/', getAllWorkouts)
 
//GET single WO
router.get('/:id', getWorkout)

router.post('/',  createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)


module.exports = router