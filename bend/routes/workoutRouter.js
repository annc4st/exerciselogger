const express = require('express')
const requireAuth = require('../middleware/requireAuth')


const { 
    createWorkout, getWorkout, getAllWorkouts, deleteWorkout, updateWorkout 
        } = require('../controllers/workoutController')

const router = express.Router();
// require authorization (for only logged in user)
router.use(requireAuth)

//to get all WO
router.get('/', getAllWorkouts)
 
//GET single WO
router.get('/:id', getWorkout)

router.post('/',  createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)


module.exports = router