const mongoose = require("mongoose");
const { Schema } = mongoose;

const permitSchema = new Schema({
  name: { type: String, required: true, ref: "something" },
  created: { type: Date, default: Date.now() },
});

const permit = mongoose.model("permit", permitSchema);

module.exports = permit;
