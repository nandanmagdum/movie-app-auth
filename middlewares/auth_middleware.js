const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const authMiddleware = async(req, res, next) => {
   try {
    const token = req.headers.authorization;
     // if absent => error
     if(!token){
        return res.status(401).json("Token Absent");
    }
    // if present => verify
    const isVerifiedToken = await jwt.verify(token, process.env.JWT);
    // if expired => error
    if(!isVerifiedToken){
       return  res.status(401).json({"Authentication Error": "Token has expired"});
    }
    // if verified => next function
    req.email = isVerifiedToken.email;
    req.name = isVerifiedToken.name;
    req.phone = isVerifiedToken.phone;
    next();
   } catch (error) {
      console.error(error.message);

   }
}

module.exports = authMiddleware;