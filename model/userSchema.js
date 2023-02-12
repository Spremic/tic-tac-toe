const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [String],
    requestFriends: [String],
  },
  {
    collection: "users",
  }
);

const model = mongoose.model("User", UserSchema);

module.exports = model;
