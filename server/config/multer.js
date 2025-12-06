const multer = require("multer");

// ინახავს ატვირთულ ფოტოებს ჩემს uploads ფოლდერში
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //     cb(null, './uploads/laptops');
  // },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
