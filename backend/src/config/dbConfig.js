import "dotenv/config"
import mongoose from "mongoose"
import envVariables from "./envConfig.js"

const dbConfiguration = async () => {
    try {
        const reponse = await mongoose.connect(envVariables.MONGO_URI)
        console.log(`Database connected successfully to ${reponse.connection.host}`)
    } catch (error) {
        throw new Error(`Error connecting to the database: ${error.message}`)
    }
}

export default dbConfiguration