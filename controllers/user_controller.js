const express = require("express");
const userModel = require("../models/user_model");

const addFavController = async(req, res) => {
    const {imdbID} = req.body;
    const email = req.email;
    try {
        const user =  await userModel.findOne({email: email});
        if(!user){
            return res.status(400).json("User not found !");
        }
        // check if id already present
        const isPresent = user.favourites.includes(imdbID); 
        if(isPresent){
        // if already present no nothing -> already liked
            return res.status(200).json("Movie already added to Favourite");
        } else {
        // else update the user model
            const updatedUser = await userModel.findOneAndUpdate({email: email} , {$push: {favourites: imdbID}}, {new: true});
            if(!updatedUser){
                return res.status(400).json("Movie  not added to favourites");
            }
            return res.status(200).json("Movie added to favourites");
        }
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const removeFavController = async(req, res) => {
    const {imdbID} = req.body;
    const email = req.email;
    try {
        const user =  await userModel.findOne({email: email});
        if(!user){
            return res.status(400).json("User not found !");
        }
        // check if id already present
        const isPresent = user.favourites.includes(imdbID); 
        if(!isPresent){
        // if already present no nothing -> already liked
            return res.status(200).json("Movie already removed from Favourite");
        } else {
        // else update the user model
            const updatedUser = await userModel.findOneAndUpdate({email: email} , {$pull: {favourites: imdbID}}, {new: true});
            if(!updatedUser){
                return res.status(400).json("Movie  not removed from favourites");
            }
            return res.status(200).json("Movie removed from favourites");
        }
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const getFavouritesController = async(req, res) => {
    try {
        const user = await userModel.findOne({email: req.email});
        if(!user){
            return res.status(400).json("User not found!");
        }
        const {favourites} = user;
        return res.status(200).json({"ids" : favourites});
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const removeAllFavController = async(req, res) => {
    try {
        const user = await userModel.findOne({email: req.email});
        if(!user){
            return res.status(400).json("User not found!");
        }
        const deleteAllIds = await userModel.findOneAndUpdate({email: user.email}, {$set : {favourites: []}}, {new: true});
        if(!deleteAllIds){
            return res.status(400).json("Error removing all favourites");
        }
        return res.status(200).json("Removed All Favourites");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const addAllFavController = async(req, res) => {
    const favs = req.body.favourites;
    try {
        const user = await userModel.findOne({email: req.email});
        if(!user){
            return res.status(400).json("User not found!");
        }
        const deleteAllIds = await userModel.findOneAndUpdate({email: user.email}, {$set : {favourites: []}}, {new: true});
        if(!deleteAllIds){
            return res.status(400).json("Error removing all favourites");
        }
        const addAllIds = await userModel.findOneAndUpdate({email: user.email}, {$set : {favourites: favs}}, {new: true});
        if(!addAllIds){
            return res.status(400).json("Error adding all favourites");
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}
module.exports = {
    addFavController,
    removeFavController,
    getFavouritesController,
    removeAllFavController,
    addAllFavController
}