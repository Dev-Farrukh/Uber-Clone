import express from "express"
import dbConfiguration from "./config/dbConfig.js"

const app = express()
dbConfiguration()

app.use(express.json())
 
export default app