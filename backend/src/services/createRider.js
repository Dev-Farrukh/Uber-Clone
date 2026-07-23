import riderModel from "../model/rider.model.js";

const createRider = async ({ fullName, email, password, vehicle, status, socketId, location }) => {
    const userExist = await riderModel.findOne({ email });
       if(userExist){
            throw new Error("User already exists")
       }
    const hashedPassword = await riderModel.hashPassword(password);
    const rider = await riderModel.create({
        fullName : {
            firstName : fullName.firstName,
            lastName : fullName.lastName
        },
        email,
        password : hashedPassword,
        vehicle : {
            vehicleType : vehicle.vehicleType,
            color : vehicle.color,
            plate : vehicle.plate,
            capacity : vehicle.capacity
        },  
        status,
        socketId,
        location
    })
    return rider
}

export default createRider;