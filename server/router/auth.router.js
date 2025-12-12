// მოდულები
const express = require("express");

// დაიმპორტებული ფუნციები auth controller-დან
const { signUp, logIn, logOut } = require("../controller/auth.controller");
const protect = require("../middleware/auth.middleware");
const { verify } = require("jsonwebtoken");
const authRouter = express.Router();


// authentication ბილიკები
authRouter.post('/signup', signUp);
authRouter.post('/login', logIn);
authRouter.post('/logout', logOut);
authRouter.get('/verify/:code', verify);

authRouter.post('/auto-login', protect, async(req, res) => {
  if (!req.user) {
    return res.status(401).json({ user: null, message: "Not logged in" });
  }
  res.status(200).json({ user: req.user });
});

module.exports = authRouter
