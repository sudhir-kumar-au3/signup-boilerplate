const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageSchema = new Schema({
  id: {
    type: String,
  },
  author: {
    type: String,
    index: true,
  },
  width: {
    type: Number,
    index: true,
  },
  height: {
    type: Number,
  },
  url: {
    type: String,
  },
  download_url: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: "5f279c8ea123fb2ad0d0c7a3",
  },
});
imageSchema.index({ author: "text" });
module.exports = {
  imageSchema,
};
