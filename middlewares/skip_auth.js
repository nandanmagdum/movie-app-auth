const express = require("express");
const authMiddleware = require("./auth_middleware");


const skipAUth = (req, res, next) => {
    console.log(req.path);
    if(req.path === "/auth/sendOTP" || req.path === "/auth/verifyOTP" || req.path === "/auth/createNewUser" || req.path === "/auth/login") {
        console.log("next function called");
        next();
    }
    if(req.path === "/") {
        res.status(200).json("SERVER IS LIVE");
    } 
    else {
        console.log("auth function called");
        authMiddleware(req, res, next);
    }
}

module.exports = skipAUth;