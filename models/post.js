const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: "admin" },
  header: { type: String, required: true },
  image: { type: String },
  content: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "category" },
  created: { type: Date, default: Date.now() },
});

const post = mongoose.model("post", postSchema);

module.exports = post;
