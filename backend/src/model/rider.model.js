import jwt from "jsonwebtoken";
import mongoose from "mongoose"
import envVariables from "../config/envConfig.js";
import bcrypt from "bcryptjs";
const riderSchema = new mongoose.Schema({
    fullName : {
        firstName : {
            type : String ,
            required : true ,
            minlength : [3 , "First name must contain atleast 3 charaters "]
        },
        lastName : {
            type : String ,
            required : true ,
            minlength : [3 , "Last name must contain atleast 3 charaters "]
        }
    },
    email : {
        type : String ,
        required : [true , "Email is required"] ,
        unique : [true , "Email must be unique"]
    },
    password : {
        type : String ,
        required : [true , "Password is required"],
        minlength : [6 , "Password should be atleast 6 character long"],
        select : false
    },
    vehicle : {
        vehicleType : {
            type : String ,
            required : true,
            enum : ["car" , "bike" , "rickshaw" ]
    
        },
        color : {
            type : String,
            required : true ,
            minlength : [3 , "Color must be 3 character long"]
        },
        plate : {
            type : String,
            required : true ,
            minlength : [3 , "Plate must be 3 character long"]
        },
        capacity : {
            type : Number,
            required : true ,
            min : [1 , "Capacity must be 1 character long"]
        }
    },
    status : {
        type : String,
        required : true ,
        enum : ["active" , "inactive"],
        default : "inactive"
    },
    socketId : {
        type : String ,
    },
    location : {
        longitude : {
            type : Number
        },
        latitude : {
            type : Number
        }
    }

})

riderSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, envVariables.JWT_SECRET, { expiresIn: '48h' });
    return token;
}
riderSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}
riderSchema.statics.hashPassword = async function(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const riderModel = mongoose.model("rider", riderSchema);
export default riderModel;