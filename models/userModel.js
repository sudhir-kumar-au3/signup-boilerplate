const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name is too short!"],
      maxLength: 15,
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
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (v) {
          return new Promise((resolve, reject) => {
            resolve(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
                v
              )
            );
          });
        },
        message:
          "Password must contain min. 6 characters, a capital letter and a special character",
      },
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
module.exports = {
  userSchema,
};
