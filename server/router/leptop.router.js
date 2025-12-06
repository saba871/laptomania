const express = require('express');
const { addLaptop, getAllLaptop, getLaptop, deleteLaptop, updateLaptop } = require('../controller/leptop.controller');
const upload = require('../config/multer');
const laptopRouter = express.Router();

// ერთნაირ ბილიკებზე მყოფი ფუნქცები
laptopRouter.route('/')
    .post(upload.array('images', 4), addLaptop)
    .get(getAllLaptop)


laptopRouter.route('/:id')
    .get(getLaptop)
    .delete(deleteLaptop)
    .patch(upload.array('images', 4), updateLaptop)

module.exports = laptopRouter
