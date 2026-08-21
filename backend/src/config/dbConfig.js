import "dotenv/config"
import mongoose from "mongoose"
import envVariables from "./envConfig.js"

const dbConfiguration = async () => {
    try {
        const reponse = await mongoose.connect(envVariables.MONGO_URI , {maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4})
        console.log(`Database connected successfully to ${reponse.connection.host}`)
    } catch (error) {
        throw new Error(`Error connecting to the database: ${error.message}`, { cause: error })
    }
}

export default dbConfiguration