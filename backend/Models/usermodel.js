const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")


const Schema = mongoose.Schema

const UserSchema = new Schema ({

    Email:{
        type : String,
        require : true,
        unique : true
    },
    Password: {
        type: String,
        require : true
    }

})

//custom method for login

UserSchema.statics.login = async function ( Email, Password){

    if(!Email || !Password){
        throw Error("All fields are mandatory")
    }

    const user = await this.findOne({Email})

    if(!user){
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(Password, user.Password)

    if(!match){
        throw Error("Incorrect Password!")
    }

    return user

}

//custom method for signup
UserSchema.statics.signup = async function(Email, Password){

    if(!Email || !Password){
        throw Error("All fields are mandatory")
    }

    if(!validator.isEmail(Email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(Password)){
        throw Error("Password is not strong")
    }

    const exixts = await this.findOne({Email})

    if(exixts){
        throw Error("Email already exixts")
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(Password, salt)

    const user = await this.create({Email, Password:hash})

    return user

}

module.exports = mongoose.model("user", UserSchema)