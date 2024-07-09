const express = require("express");
const { addFavController, removeFavController, getFavouritesController, removeAllFavController, addAllFavController } = require("../controllers/user_controller");

const userRouter = express.Router();

userRouter.patch("/addFavourite", addFavController);
userRouter.patch("/removeFavourite", removeFavController);
userRouter.post("/favourites", getFavouritesController);

userRouter.patch("/removeAllFav", removeAllFavController);
userRouter.patch("/addAllFav", addAllFavController);

module.exports = userRouter;