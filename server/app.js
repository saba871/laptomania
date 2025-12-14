// გადმოწერილი მოდულები
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


// დაიმპორტებული მოდულები
const globalErrorHandle = require("./controller/error.controller");
const laptopRouter = require("./router/leptop.router");
const authRouter = require("./router/auth.router");

const app = express();
dotenv.config();

// შუამავალი ფუნქციები
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
)

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);


app.use(cookieParser());
app.use(express.json());

// ბილიკები
app.use("/api/laptops", laptopRouter);
app.use("/api/auth", authRouter)


// გლობალური erorr ების კონტროლერი შუამავალი
app.use(globalErrorHandle);

// დაკავშირება მონაცმეთა ბაზასთან
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("connecting to mongoDB");

        app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("connection error", err);
    });
