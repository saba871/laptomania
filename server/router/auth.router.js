// მოდულები
const express = require("express");

// დაიმპორტებული ფუნციები auth controller-დან
const { signUp, logIn } = require("../controller/auth.controller");
const authRouter = express.Router();


// authentication ბილიკები
authRouter.post('/signup', signUp);
authRouter.post('/login', logIn)

module.exports = authRouter
