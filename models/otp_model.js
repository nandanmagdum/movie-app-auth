const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    expiry : {type: Number, default: 120},
}, {timestamps: true});

const otpModel  = mongoose.model("otps", otpSchema);

module.exports = otpModel;