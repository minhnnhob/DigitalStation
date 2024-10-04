const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vfTokenSchema = new Schema({  
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    tokenVf:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

module.exports = mongoose.model("vfToken", vfTokenSchema);