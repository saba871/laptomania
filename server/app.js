// გადმოწერილი მოდულები
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');

// დაიმპორტებული მოდულები 
const globalErrorHandle = require('./controller/error.controller');
const laptopRouter = require('./router/leptop.router');
const path = require('path');

const app = express();
dotenv.config();

// შუამავალი ფუნქციები
app.use(cors());
app.use(express.json());

// app.use('/laptops/images', express.static(path.join(__dirname, 'uploads/laptops')));

// ბილიკები
app.use('/api/laptops', laptopRouter);


// გლობალური erorr ების კონტროლერი შუამავალი 
app.use(globalErrorHandle);


// დაკავშირება მონაცმეთა ბაზასთან
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("connecting to mongoDB")

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("connection error", err)
    })
