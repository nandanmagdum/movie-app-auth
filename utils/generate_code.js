const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");

const generateSixDigitCode = async() => {
    // Generate a random number between 100000 and 999999
    const min = 100000;
    const max = 999999;
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    // store otp in otp db with email otp created date 
    return randomCode;
  }

  module.exports = generateSixDigitCode;