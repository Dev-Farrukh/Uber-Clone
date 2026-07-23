import express from "express"
import { body } from "express-validator"
import * as riderController from "../controller/rider.controller.js"
import  {riderTokenCheck}  from "../middleware/auth.middleware.js"
const router = express.Router()


router.post("/register" , [
     body('fullName.firstName').notEmpty().isLength({min : 3}).withMessage("First name must be at least 3 characters long"),
     body('fullName.lastName').isLength({min : 3}).withMessage("Last name must be at least 3 characters long"),
     body('email').isEmail().notEmpty().withMessage("Please provide a valid email address"),
     body('password').isLength({min : 6}).notEmpty().withMessage("Password must be at least 6 characters long"),
     body('vehicle.vehicleType').notEmpty().isIn(["car" , "bike" , "rickshaw"]).withMessage("Vehicle type must be either car, bike or rickshaw"),
     body('vehicle.color').notEmpty().isLength({min : 3}).withMessage("Color must be at least 3 characters long"),
     body('vehicle.plate').notEmpty().isLength({min : 3}).withMessage("Plate must be at least 3 characters long"),
     body('vehicle.capacity').notEmpty().isInt({min : 1}).withMessage("Capacity must be a positive integer"),
     body('status').notEmpty().isIn(["active" , "inactive"]).withMessage("Status must be either active or inactive"),
     body('socketId').optional().isString().withMessage("Socket ID must be a string"),
     body('location.longitude').optional().isFloat().withMessage("Longitude must be a number"),
     body('location.latitude').optional().isFloat().withMessage("Latitude must be a number")
] , riderController.riderRegister)

router.post("/login" , [
    body('email').isEmail().notEmpty().withMessage("Please provide a valid email address"),
    body('password').isLength({min : 6}).notEmpty().withMessage("Password must be at least 6 characters long")
] , riderController.riderLogin)          

router.get("/profile" , riderTokenCheck ,riderController.riderProfile)

router.get("/logout" , riderTokenCheck , riderController.riderLogout)

export default router