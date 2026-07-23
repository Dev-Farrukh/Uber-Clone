/* eslint-disable no-undef */
import "dotenv/config"

const ALL_KEYS = [
    "MONGO_URI",
    "PORT",
    "JWT_SECRET",
]

ALL_KEYS.forEach((key)=> {
    if(!process.env[key]) {
        throw new Error(`Missing environment variable ${key} in envConfig.js `)
    }
})

const envVariables = Object.fromEntries(
    ALL_KEYS.map((key)=> [key , process.env[key]])
)

export default envVariables