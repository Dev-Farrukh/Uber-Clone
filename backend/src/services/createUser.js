import userModel from "../model/user.model.js";

const createUser = async ({fullName, email, password}) => {
    if (!fullName || !email || !password) {
        throw new Error("Required fields are missing")
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const user = await userModel.create({ 
        fullName: { 
            firstName: fullName.firstName,
            lastName: fullName.lastName 
        }, 
        email, 
        password 
    });

    return user;
}

export default createUser;