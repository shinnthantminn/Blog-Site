const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: [{ type: Schema.Types.ObjectId, ref: "role" }],
  permit: [{ type: Schema.Types.ObjectId, ref: "permit" }],
  created: { type: Date, default: Date.now() },
});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
