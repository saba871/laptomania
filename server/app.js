// გადმოწერილი მოდულები
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// დაიმპორტებული მოდულები
const globalErrorHandle = require("./controller/error.controller");
const laptopRouter = require("./router/leptop.router");
const authRouter = require("./router/auth.router");
const { oauthRouter } = require("./router/oauth.router");
const paymentRouter = require("./router/payment.router");

const app = express();

// შუამავალი ფუნქციები
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

// ბილიკები
app.use("/api/laptops", laptopRouter);
app.use("/api/auth", authRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/payment", paymentRouter)


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
