const express = require('express');
const { addLaptop, getAllLaptop, getLaptop, deleteLaptop, updateLaptop } = require('../controller/leptop.controller');
const upload = require('../config/multer');
const protect = require('../middleware/auth.middleware');
const allowedTo = require('../middleware/roles.middleware');
const laptopRouter = express.Router();

// ერთნაირ ბილიკებზე მყოფი ფუნქცები
laptopRouter.route('/')
  .post(protect, allowedTo('admin', 'moderator'), upload.array('images', 4), addLaptop)
  .get(getAllLaptop)


laptopRouter.route('/:id')
  .get(getLaptop)
  .delete(protect, allowedTo('admin', 'moderator'), deleteLaptop)
  .patch(protect, allowedTo('admin', 'moderator'), upload.array('images', 4), updateLaptop)

module.exports = laptopRouter
