import express from "express"
import {userTokenCheck} from "../middleware/auth.middleware.js"
import { query } from "express-validator"
import  * as travelController from "../controller/travel.controller.js";

const router = express.Router()

router.get("/distance" , [
    query("address").isLength({min : 3}).withMessage("Invalid Address")
] , userTokenCheck , travelController.getCoordinates)

export default router