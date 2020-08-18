const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name is too short!"],
      maxLength: 25,
    },
    mobile: {
      type: Number,
      unique: true,
      validate: {
        validator: function (v) {
          return new Promise((resolve, reject) => {
            resolve(/^\d{10}$/.test(v));
          });
        },
        message: "Phone no. should be of 10 digits",
      },
      required: [true, "User phone number required"],
    },
    verifiedMobile: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return new Promise((resolve, reject) => {
            resolve(
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                v
              )
            );
          });
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      unique: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must contain atleast 6 characters!"],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
userSchema.index({ email: 1, mobile: 1, name: -1 });
module.exports = {
  userSchema,
};
