import jwt from "jsonwebtoken";
import blacklistModel from "../model/blacklisted.tokens.js";
import envConfig from "../config/envConfig.js";
import userModel from "../model/user.model.js";
import riderModel from "../model/rider.model.js";

export const userTokenCheck = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isValid = await blacklistModel.findOne({ token });
    if (isValid) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }
    try {
        const decoded = jwt.verify(token, envConfig.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        console.log(decoded , user);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        // eslint-disable-next-line preserve-caught-error
        throw new Error("Invalid token" + error.message);

    }
}

export const riderTokenCheck = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(404).json({message : "Unauthorized"});
    }
    const isBlacklisted = await blacklistModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message : "Token is blacklisted"});
    }
    try {
        const decoded = jwt.verify(token , envConfig.JWT_SECRET);
        const rider = await riderModel.findById(decoded._id);
        if(!rider){
            return res.status(400).json({message :"Unauthorized"})
        }
        req.rider = rider
        next()
    }catch(error){
            // eslint-disable-next-line preserve-caught-error
            throw new Error("Error while checking token" + error)
    }
}