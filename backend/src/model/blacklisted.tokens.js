import mongoose from "mongoose";

const blacklistedTokensSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 86400
    }

})

const blacklistModel = mongoose.model("blacklistTokens" , blacklistedTokensSchema)
export default blacklistModel