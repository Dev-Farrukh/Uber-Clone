import { validationResult } from "express-validator";
import createRider from "../services/createRider.js";
import riderModel from "../model/rider.model.js";
import blacklistModel from "../model/blacklisted.tokens.js";

export const riderRegister = async (req , res) => {
       const error = validationResult(req);
       if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array() });
       }
       const { fullName , email , password , vehicle , status , socketId , location } = req.body;
       
       const rider = await createRider({
        fullName , email , password , vehicle , status , socketId , location
       }) 
       const token = rider.generateAuthToken();

       res.status(201).json({rider , token})

}

export const riderLogin = async (req , res) => {
     const error = validationResult(req);
     if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() });
     }
     const { email , password } = req.body;
     const rider = await riderModel.findOne({email}).select("+password");
     if(!rider){
        return res.status(400).json({message : "Invalid email or password"})
     }
     const isMatch = await rider.comparePassword(password);
     if(!isMatch){
        return res.status(400).json({message : "Invalid email or password"})
     }
     const token = rider.generateAuthToken();
     res.cookie("token" , token , {sameSite : "none" , httpOnly : true , secure: false})

     res.status(200).json({rider , token})
}

export const riderProfile = async (req , res) => {
     res.status(200).json(req.rider)
}

export const riderLogout = async (req , res) => {
     const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
     if(!token){
        return res.status(400).json({message : "Unauthorized"})
     }
     await blacklistModel.create({token});
     
     res.clearCookie("token" , {sameSite : "none" , httpOnly : true , secure: false})
     res.status(200).json({message : "Logged out successfully"})
}