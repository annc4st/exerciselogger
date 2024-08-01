const express = require('express')
const userRouter = express.Router();

const { loginUser, signupUser } = require ('../controllers/userController')


// login router
userRouter.post('/login', loginUser )

// sign up router
userRouter.post('/signup', signupUser )


module.exports = userRouter

