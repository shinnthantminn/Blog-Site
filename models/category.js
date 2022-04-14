const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, ref: "something" },
  created: { type: Date, default: Date.now() },
});

const category = mongoose.model("category", categorySchema);

module.exports = category;
