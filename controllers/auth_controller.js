const express = require("express");
const generateSixDigitCode = require("../utils/generate_code.js");
const mailService = require("../utils/mail_service.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const otpModel = require("../models/otp_model.js");
const isOTPexpired = require("../utils/otp_expiry.js");
const userModel = require("../models/user_model.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// send otp to user's email
const sendOtpController = async (req, res) => {
    const { email } = req.body;
    try {
        // create otp
        const otp = await generateSixDigitCode();
        console.log(otp); // success
        // hash otp
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        console.log(hashedOtp);
        // delete previous otps for the same email
        await otpModel.deleteMany({email: email});
        // save otp to DB
        await otpModel.create({
            email: email,
            otp: hashedOtp,
        });        
        // send otp to user's email
        mailService.sendMailWithOtp(email, otp);
        // if(mailStatus === "success"){
            return res.status(200).json("OTP SENT");
        // }
        // return res.status(400).json("Email is invalid and doesn't exists");
       
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

// verify otp that user 
const verifyOTPController = async(req, res) => {
    const {email , otp } = req.body;
    try {
        // get the otp model
        const otpData = await otpModel.findOne({email: email});
        
        // if email not found
        if(!otpData) {
            return res.status(400).json("Wrong Email, request for the OTP again");
        }
        // if otp expired ~!
        const expiryStatus = await isOTPexpired(otpData);
        if(expiryStatus === "OTP_EXPIRED"){
            return res.status(400).json("OTP expired ! please try again !");
        }
        // compare otp 
        const isSame = await bcrypt.compare(otp, otpData.otp);
        // wrong otp
        if(isSame === false){
            return res.status(400).json("Wrong OTP !");
        }
        // success
        return res.status(200).json("OTP Verified Successfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

// save user data to DB
const createNewUserController = async(req, res) => {
    const body = req.body;
    try {
        // check if user alread exists
        const user = await userModel.findOne({email: body.email});
        if(user){
           return  res.status(400).json("Account Alreay exists , please try signing in !");
        }
        // hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);
        console.log(hashedPassword);
        // save new document
        const newUser = await userModel.create(
            {
                email: body.email,
                name: body.name,
                phone: body.phone,
                password: hashedPassword
            }
        );
        if(!newUser){
            return res.status(400).json("Error creating new user");
        }
        return res.status(200).json(newUser);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const loginUserController = async(req, res) => {
    const {email, password} = req.body;
    try {
        // check if email exists in users DB
        const user = await userModel.findOne({email: email});
        // if not exits : -> create your accout
        if(!user) {
            return res.status(400).json("Email not exits ! Please create your accout first !");
        }
        // compare passwords 
        const isSame = await bcrypt.compare(password, user.password);
        // if not same -> password is wrong
        if(!isSame){
           return res.status(400).json("Wrong Password !");
        }

        // generate jwt token
        try {
            const token = await jwt.sign({email: user.email, name: user.name, phone: user.phone}, process.env.JWT, {expiresIn: "30d"});

            // send jwt to response
            return res.status(200).json({"token" : token});
        } catch (error) {
            // if jwt failed -> server error
            return res.status(500).json(error.message); 
        }

        
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
    
    
}

const checkIfUserExsists = async(req, res) => {
    const email = req.body.email;
    try {
        const user = await userModel.findOne({email: email});
        if(user){
            return res.status(200).json(true);
        } else {
            return res.status(200).json(false);
        }
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}
module.exports = {
    sendOtpController,
    verifyOTPController,
    createNewUserController,
    loginUserController,
    checkIfUserExsists
}