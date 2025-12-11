const User = require("../model/user.model");
const AppError = require("../utils/Apperror");
const catchAsync = require("../utils/catchAsync");


// ვინახავთ json web token-ს cookie-ში
const createAndSendToken = (user, statusCode, res) => {
  const token = user.signToken();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  }

  user.password = undefined

  res.status(statusCode).cookie("lg", token, cookieOptions).json({
    status: "success",
    message: "Logged in successfully",
    user
  });
}


// ვქმნი მომხმარებელის ექაუნთს (რეგისტრაცია)
const signUp = catchAsync(async (req, res, next) => {
  const { fullname, email, password } = req.body;

  const newUser = await User.create({ fullname, email, password });

  res.status(201).json({message: "User created successfully"});
})


// ეხმარება მომხმარებელს რომ შევიდეს უკვე შექმნილ ექაუნთზე
const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if(!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  const isPasswordValid = await user.comparePassword(password);

  if(!isPasswordValid) {
    return next(new AppError("Invalid email or password", 401));
  }

  createAndSendToken(user, 200, res)
})


// log out ფუნქცია
const logOut = catchAsync(async (req, res, next) => {
  res.clearCookie("lg");
  res.status(200).json({message: "Logged out successfully"});
})


module.exports = {
  signUp,
  logIn,
  logOut
}
