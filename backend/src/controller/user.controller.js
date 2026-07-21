import userModel from "../model/user.model.js";
import {validationResult} from "express-validator"
import createUser from "../services/createUser.js";

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { fullName, email, password } = req.body;
    
    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken()
    const response = user.toObject()
    delete response.user
    return res.status(201).json({ message: "User registered successfully" , response , token  });
}

export const loginUser = async (req , res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log(user , password);
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    return res.status(200).json({ message: "Login successful", user: user.fullName, token });
}