import express from "express"
import dbConfiguration from "./config/dbConfig.js"
import userRouter from "./routes/user.routes.js"
import riderRouter from "./routes/rider.routes.js"
import cookieParser from "cookie-parser"

const app = express()
dbConfiguration()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/user" , userRouter)
app.use("/api/rider" , riderRouter)

 
export default app