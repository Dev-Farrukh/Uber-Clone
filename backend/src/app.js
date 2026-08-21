import express from "express"
import userRouter from "./routes/user.routes.js"
import riderRouter from "./routes/rider.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import travelRouter from "./routes/distance.route.js"
import envVariables from "./config/envConfig.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin : ["https://probable-space-fishstick-g4j5vjr6wjqx2vwg-5173.app.github.dev" , "http://localhost:5173" , "https://ld5859dw-5173.inc1.devtunnels.ms" , envVariables.FORNTEND_URL],
    credentials : true ,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

}))

app.use("/api/user" , userRouter)
app.use("/api/rider" , riderRouter)
app.use("/api" , travelRouter)

 
export default app