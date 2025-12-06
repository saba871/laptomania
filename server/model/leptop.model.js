const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Laptop brand is required"],
      trim: true,
    },

    model: {
      type: String,
      required: [true, "Laptop model is required"],
      trim: true,
    },

    proccesor: {
      type: String,
      required: true,
    },

    ram: {
      type: String, // in GB
      required: true,
    },

    storage: {
      type: String,
      required: true,
    },

    graphics: {
      type: String,
      default: "Integrated",
    },

    display: {
      type: String, // inches
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    os: {
      type: String,
      default: "Windows 11",
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: [String],

    description: {
      type: String,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Laptop = mongoose.model("leptop", laptopSchema);

module.exports = Laptop;
