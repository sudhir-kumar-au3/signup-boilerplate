const mongoose = require("mongoose");
const { userSchema } = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();
// connect Azure cosmoDB (mongodb instance) database
const url = process.env.DB_URL;
const connection = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
connection.on("error", () => {
  console.log("> error occurred during db connection");
});
connection.on("open", () => {
  console.log("> successfully connected to db");
});
const Users = connection.model("users", userSchema);
module.exports = {
  Users,
};
