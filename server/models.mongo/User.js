const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { roles } = require("../common/constants");

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    roles: { type: [String], enum: Object.values(roles), required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
