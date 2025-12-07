const AppError = require("../utils/Apperror");


const allowedTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 401));
    }
    next();
  }
}

module.exports = allowedTo;
