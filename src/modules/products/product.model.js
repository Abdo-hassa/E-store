const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    desc: { type: String, required: true },
    img: { type: String },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

ProductSchema.index({ title: "text" });
ProductSchema.index({ desc: "text" });


ProductSchema.pre("findOneAndUpdate", async function (next) {
  const product = this;
  if (product._update["$set"].file) {
    const data = await cloudinary.v2.uploader.upload(
      product._update["$set"].file.path
    );
    console.log(data.url);
    product._update["$set"].img = data.url;
  }
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
