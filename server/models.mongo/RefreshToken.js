const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema(
  {
    token: { type: String, unique: true, required: true },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      
    },
  },
  { timestamps: true }
);

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema, "refreshTokens");

module.exports = RefreshToken;
