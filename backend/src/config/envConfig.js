/* eslint-disable no-undef */
import "dotenv/config"

const ALL_KEYS = [
    "MONGO_URI",
    "PORT",
    "JWT_SECRET",
    "FRONTEND_URL"
]

ALL_KEYS.forEach((key)=> {
    {console.log("FF",process.env.FRONTEND_URL)}
    if(!process.env[key]) {
        throw new Error(`Missing environment variable ${key} in envConfig.js `)
    }
})

const envVariables = Object.fromEntries(
    ALL_KEYS.map((key)=> [key , process.env[key]])
)

export default envVariables