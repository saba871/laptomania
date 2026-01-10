// მოდელები
const Laptop = require("../model/leptop.model");

// დამხამრე ფუნცქციები
const AppError = require("../utils/Apperror");
const catchAsync = require("../utils/catchAsync");
const { imageUpload } = require("../utils/image");

// ვამატებთ ლეპტოპს მონაცემთა ბაზაში
const addLaptop = catchAsync(async (req, res, next) => {
  const body = req.body;

  // თუ ფაილები მივიდა
  let imageUrls = [];
  if (req.files && req.files.length > 0) {
    const image = req.files.map((file) => file.path);

    // ატვირთვა Cloudinary-ში
    const result = await imageUpload("laptops", image);

    // secure_url-ების მასივი
    imageUrls = result.map((image) => image.secure_url);
  }

  body.image = imageUrls;

  // სწორად ასაინმენტი DB ველისთვის

  const newLaptop = await Laptop.create(body);
  res.status(201).json(newLaptop);
});

// ვნახულობთ ყველა ლეპტოპს რაც ბაზაშია
const getAllLaptop = catchAsync(async (req, res, next) => {
  const laptops = await Laptop.find();

  res.status(200).json(laptops);
});

// მოგვაქვს ლეპტოპი ID-ის დახმარებით
const getLaptop = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const laptop = await Laptop.findById(id);

  if (!laptop) {
    return next(new AppError("Laptop cannot be found (error in getLaptop)", 404));
  }
  res.status(200).json(laptop);
});

// შლის ლეპტოპს ID ის დახმარებით
const deleteLaptop = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const laptop = await Laptop.findByIdAndDelete(id);

  if (!laptop) {
    return next(new AppError("Laptop cannot be found (error in deleteLaptop)", 404));
  }

  res.status(200).send("Laptop deleted");
});

// ცვლის ლეპტოპის ინგორმაციას ID-ის დახმარებით
const updateLaptop = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  const laptop = await Laptop.findByIdAndUpdate(id, body, { new: true });

  if (!laptop) {
    return next(new AppError("Laptop cannot be found (error in updateLaptop)", 404));
  }

  res.status(200).json(laptop);
});

module.exports = {
  addLaptop,
  getAllLaptop,
  getLaptop,
  deleteLaptop,
  updateLaptop,
};
