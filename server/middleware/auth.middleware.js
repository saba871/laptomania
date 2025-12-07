const jwt = require("jsonwebtoken");
const AppError = require("../utils/Apperror");
const User = require("../model/user.model");
const catchAsync = require("../utils/catchAsync");

// შუამავალი ფუნქცია რომელიც აძლევს მომხმარებელს permision-ს
const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.lg;

  if(!token) {
    return next(new AppError("You are not logged in", 401));
  }

  // { id: 'userID', role: "admin" }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // ვპოულობთ მომხამრებელს id-ით
  const currentUser = await User.findById(decoded.id);

  if(!currentUser) {
    return next(new AppError("The user belonging to this token does no longer exist", 401));
  }

  req.user = currentUser;
  next();
})

module.exports = protect
