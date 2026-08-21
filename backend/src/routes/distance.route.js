import express from "express"
import {riderTokenCheck, userTokenCheck} from "../middleware/auth.middleware.js"
import { body, query } from "express-validator"
import  * as travelController from "../controller/travel.controller.js";

const router = express.Router();

router.get("/coordinates" , [
    query("address").isLength({min : 3}).withMessage("Invalid Address")
] , userTokenCheck , travelController.getCoordinate)

router.get("/distance" , [
    query("pickupLat").isLength({min : 3}).withMessage("Invalid pickup"),
    query("pickupLong").isLength({min : 3}).withMessage("Invalid pickup"),
    query("destinationLat").isLength({min : 3}).withMessage("Invalid destination"),
    query("destinationLong").isLength({min : 3}).withMessage("Invalid destination")
] , userTokenCheck , travelController.getTotalDistance)

router.get("/suggestion" , [
    query("input").isLength({min : 3}).withMessage("Invalid Input")
] , userTokenCheck , travelController.getAutoCompleteSuggestion)


router.post("/create-ride" , [
    query("vehicleType").isLength({min : 3}).isIn(["car", "bike", "auto"]).withMessage("Invalid Vehile Type"),
    query("pickup").isLength({min : 3}).withMessage("Invalid pickup"),
    query("destination").isLength({min : 3}).withMessage("Invalid destination"),
] , userTokenCheck , travelController.generateRide)

router.get("/fare" , [
    query("pickup").isLength({min : 3}).withMessage("Invalid pickup"),
    query("destination").isLength({min : 3}).withMessage("Invalid destination"),
] , userTokenCheck , travelController.getFare)

router.post("/confirm-ride" , [
    body("rideId").isMongoId().withMessage("Invalid MongoDB ObjectId")
] , riderTokenCheck , travelController.confirmThisRide)

router.get('/start-ride',
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 4, max: 6 }).withMessage('Invalid OTP'),
    riderTokenCheck ,travelController.startRide
)

export default router