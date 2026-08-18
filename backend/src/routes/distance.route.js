import express from "express"
import {userTokenCheck} from "../middleware/auth.middleware.js"
import { query } from "express-validator"
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

export default router