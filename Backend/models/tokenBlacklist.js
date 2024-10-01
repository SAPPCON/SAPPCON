import mongoose from "mongoose";

const { Schema } = mongoose;

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

export default mongoose.model("TokenBlacklist", tokenBlacklistSchema);