const repository = require("./product.repository");
const AppError = require("../../utils/appError");
const config = require("../../config/config");
const utils = require("./products.utils");
const cloudinary = require("cloudinary");
const Product = require("../products/product.model");

module.exports = {
  async create(req) {
    let err = false;
    let response = {};
    let data = {};
    if (req.file) {
       data = await cloudinary.v2.uploader.upload(req.file.path);
    }

    const productData = {
      ...req.body,
      //   img: data.url,
    };

    if (!productData) {
      err = new AppError("Issue in Product Data . Try again later.", 500);
      return { err, response };
    }

    const product = await repository.save(productData);

    response = {
      data: product,
      status: "success",
      statusCode: 200,
    };
    return { err, response };
  },

  async update(req) {
    let err = false;
    let response = {};

    const productId = req.params.id;
    let updateobj;
    if (req.file) {
      updateobj = {
        ...req.body,
        file: req.file,
      };
    } else {
      updateobj = {
        ...req.body,
      };
    }
    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: updateobj },
      { new: true }
    );
    if (!product) {
      err = new AppError("there is no product", 401);
      return { err, response };
    }
    await product.save();

    response = {
      data: product,
      status: "updated",
      statusCode: 200,
    };
    return { err, response };
  },

  async delete(req) {
    let err = false;
    let response = {};

    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    response = {
      status: "success",
      message: `Product : ${product.id} Deleted`,
      statusCode: 200,
    };
    return { err, response };
  },

  async getOne(req) {
    let err = false;
    let response = {};

    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      err = new AppError("No product found", 404);
      return { err, response };
    }
    response = {
      status: "success",
      data: product,
      statusCode: 200,
    };
    return { err, response };
  },

  async getAll(req) {
    let err = false;
    let response = {};

    const qcategory = req.query.category;

    let skip = req.query.skip || config.skip;
    let limit = req.query.limit || config.limit;

    let matchQuery = {};
    let pipeline = [];

    let products;

    if (qcategory) {
      matchQuery = { categories: { $in: [qcategory] } };
    }

    pipeline = [
      { $match: matchQuery },
      { $skip: Number(skip) },
      { $limit: Number(limit) },
    ];

    products = await repository.aggregate(pipeline);

    response = {
      status: "success",
      data: products,
      statusCode: 200,
    };
    return { err, response };
  },

  async search(req) {
    let err = false;
    let response = {};

    const allDate = req.body;
    const data = utils.generateCriteriaObject(allDate);

    const matchedProduct = await repository.find({ filter: data });

    response = {
      status: "success",
      data: matchedProduct,
      statusCode: 200,
    };
    return { err, response };
  },
};
