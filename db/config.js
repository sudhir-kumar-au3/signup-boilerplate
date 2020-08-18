const mongoose = require("mongoose");
const { userSchema } = require("../models/userModel");
const { imageSchema } = require("../models/imageModel");
const dotenv = require("dotenv");
const file = require("../100Images.json");
const casual = require("casual");
dotenv.config();
// connect Azure cosmoDB (mongodb instance) database
const url = process.env.DB_URL;
const connection = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: false,
});
connection.on("error", () => {
  console.log("> error occurred during db connection");
});
connection.on("open", () => {
  console.log("> successfully connected to db");
});
//fake data to be dumped in database
const data = [...new Array(15000)].map(() => ({
  author: casual.name,
  download_url: casual.string,
  height: casual.integer(10, 1000),
  width: casual.integer(20, 2000),
  url: casual.domain,
}));
const Images = connection.model("images", imageSchema);
const Users = connection.model("users", userSchema);
connection.once("open", () => {
  Images.countDocuments()
    .then((res) => {
      if (res == 0) {
        Images.insertMany(file, (error, result) => {
          if (error) throw error;
          console.log(`Inserted ${result.length} rows`);
        });
      } else {
        console.log("data already dumped");
      }
    })
    .catch((error) => console.error("error: ", error));
});
Users.ensureIndexes((err) => {
  if (err) console.log("error: ", err);
  else console.log("Index created!");
});
Images.ensureIndexes((err) => {
  if (err) console.log("error: ", err);
  else console.log("Index created!");
});
module.exports = {
  Users,
  Images,
};
