import jwt  from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import envVariables from "../config/envConfig.js";

const userSchema = new mongoose.Schema({
    fullName :{
        firstName : {
            type : String,
            required : [true , "First name is required"],
            minlength : [3 , "First name must be at least 3 characters long"]
            
        },
        lastName : {
            type : String,
            required : [true , "Last name is required"],
            minlength : [3 , "Last name must be at least 3 characters long"]    
        }
    },
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : [true , "Email already exists"]
    },
    password : {
        type : String,
        required : [true , "Password is required"],
        minlength : [6 , "Password must be at least 6 characters long"],
        select : false
    },
    socketId : {
        type : String,
    }
}, )

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id : this._id} , envVariables.JWT_SECRET , {expiresIn : "48h"})
    return token;   
}

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password , this.password)
    return isMatch;
}

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)
    return hashedPassword;
}

const userModel = mongoose.model("user" , userSchema)
export default userModel