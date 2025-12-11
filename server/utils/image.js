const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");

const settings = {
  use_filename: true,
  unique_filename: true,
  overwrite: true,
  resource_type: "image",
  quality: "auto",
  format: "webp",
  transformation: [{ width: 400, height: 400, crop: "fit", gravity: "center" }],
};


// ტვირთავს ფოტოს cloudinary-ში
const imageUpload = async (folder, files) => {
  try {
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file, { ...settings, folder })
    );

    const result = await Promise.all(uploadPromises);

    return result;
  } catch (error) {
    console.log("error is in image upload function", error);
  }
};


// შლის ფოტოს claudinary-იდან
const deleteImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log("error is in delete image function", error);
  }
};

module.exports = {
  imageUpload,
  deleteImage,
};
