const express = require("express");
const authRouter = require("./auth_router");
const userRouter = require("./user_router");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({"Server is live": req.email});
});

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;