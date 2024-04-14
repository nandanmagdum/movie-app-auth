const express = require("express");
const authRouter = require("./auth_router");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json("Server is live");
});

router.use("/auth", authRouter);

module.exports = router;