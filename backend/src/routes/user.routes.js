import express from "express";
import {body} from "express-validator";
import { loginUser, registerUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register"  , [
  body('fullName.firstName').isLength({min : 3}).withMessage("First name must be at least 3 characters long"),
  body('fullName.lastName').isLength({min : 3}).withMessage("Last name must be at least 3 characters long"),
  body('email').isEmail().withMessage("Please provide a valid email address"),
  body('password').isLength({min : 6}).withMessage("Password must be at least 6 characters long")
] , registerUser)


userRouter.post("/login" , [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password").isLength({min : 6}).withMessage("Password must be at least 6 characters long")
] , loginUser)

export default userRouter