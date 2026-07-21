import express from "express"
import dbConfiguration from "./config/dbConfig.js"
import userRouter from "./routes/user.routes.js"

const app = express()
dbConfiguration()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth" , userRouter)
 
export default app