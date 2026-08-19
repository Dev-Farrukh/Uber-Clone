import mongoose from "mongoose"

const rideSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user" ,
        required : true
    },
    captain : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "rider" ,
    },
    pickup : {
        type : String ,
        required : true
    },
    destination : {
        type : String ,
        required : true
    },
    fare : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["Pending" , "Ongoing" , "Completed" , "Cancelled" , "Accepted"],
        default : "Pending"
    },
    duration : {
        type : Number,
    },
    distance : {
        type : Number,
    },
    orderId : {
        type : String,
    },
    payId : {
        type : String,
    },
    otp : {
        type : Number ,
        required : true
    },
    signature : {
        type : String
    }

})

const rideModel = mongoose.model("ride" , rideSchema)
export default rideModel