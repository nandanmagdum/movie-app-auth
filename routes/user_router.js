const express = require("express");
const { addFavController, removeFavController, getFavouritesController } = require("../controllers/user_controller");

const userRouter = express.Router();

userRouter.patch("/addFavourite", addFavController);
userRouter.patch("/removeFavourite", removeFavController);
userRouter.get("/favourites", getFavouritesController);

module.exports = userRouter;