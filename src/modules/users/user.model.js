const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please provide your first name"],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "Please provide your last name"],
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Please provide your email"],
      unique: true,
      lowerCase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
      select: false,
    },

    country: {
      name: String,
      imagePath: String,
      slug: String,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
    },
    cart: {
      items: [
        {
          productid: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  {
    versionKey: false,
  }
);

//plugins
userSchema.plugin(uniqueValidator);

// Model Hooks
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

// Instance methods
userSchema.methods.isPasswordCorrect = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.isPasswordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productid.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productid: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productid) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productid.toString() !== productid.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

const User = mongoose.model("User", userSchema);
module.exports = User;
