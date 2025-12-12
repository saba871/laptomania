const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

// მომხმარებლის მოდელი
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "User fullname is required"],
    lowercase: true
  },

  email: {
    type: String,
    required: [true, "User email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },

  password: {
    type: String,
    required: [ true, "User password is required"],
    minlength: [4, "Password must be at least 4 characters"],
    maxlength: [12, "Password must be at most 12 characters"],
    select: false
  },

  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user"
  },

  isActive: {
    type: Boolean,
    default: true
  },

  varificationCode: String,

  isVerified: {
    type: Boolean,
    default: false // true
  },

}, { timestamps: true })


// შექმნის მომენტში სანამ დასეივდება მომხმარებლის info მანამდე გაეშვება ეს კოდი რომელიც მოახდენს password-ის hashing-ს
userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();
  // უნდა გამოვიყენოთ hash და არა hashSync რათა არ მოხდეს კოდის დაბლოკვა
  this.password = await bcrypt.hash(this.password, 12);
  next();
})


// ადარებს logIn ის დროს მომხმარებლის პაროლებს და აბრუენებს true ან false
userSchema.methods.comparePassword = async function(candidate) {
  return await bcrypt.compare(candidate, this.password)
}


userSchema.methods.createEmailVerificationToken = function() {
  const code = crypto.randomBytes(12).toString("hex");
  this.varificationCode = code
  return code
}


// ვქმნით json web token-ს

// 1. რა გვინდა შევნიხოთ
// 2. secret key => google-იდან random key
// სეთინგები: რამდენ ხანში ამოიწუროს ვადა token-ის

userSchema.methods.signToken = function() {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const User = mongoose.model("User", userSchema);
module.exports = User
