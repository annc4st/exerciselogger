const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')
const validator = require('validator')


const userSchema = new Schema ({
    email: {
        type: String,
        required:  [true, "is required"],
        unique: true
    },

    password: {
        type: String,
        required: true

    }
})

//static sign up method

userSchema.statics.signup = async function (email, password) {
    //validation
    if (!email || !password) {
        throw Error ("All fields must be filled!")
    }

    //check if email is valid
    if(!validator.isEmail(email)){
        throw Error ("Email is not valid")
    }

    if (!validator.isStrongPassword(password)){
        throw Error ("Password is not strong enough")
    }

    //check whether email is new orused
    const emailExists = await this.findOne({email})

    if (emailExists) {
        throw Error ("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hashedPassword })

    return user
}


//static login method
userSchema.statics.login = async function (email, password) {
        //validation
    if (!email || !password) {
        throw Error ("All fields must be filled!")
        }

    const user = await this.findOne({email})

    if (!user) {
        throw Error ("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error ("Incorrect password")
    }

    return user

}

module.exports = mongoose.model('User', userSchema)