import "dotenv/config"

const ALL_KEYS = [
    "MONGO_URI",
    "PORT",
]

ALL_KEYS.map((key)=> {
    if(!process.env[key]) {
        throw new Error(`Missing environment variable ${key} in envConfig.js `)
    }
})

const envVariables = Object.fromEntries(
    ALL_KEYS.map((key)=> [key , process.env[key]])
)

export default Object.freeze(envVariables)