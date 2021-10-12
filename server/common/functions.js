const pool = require("../db");
const jwt = require("jsonwebtoken");
const { emailRegex, accessTokenExpiration } = require("../common/constants");

const validateNewUser = async (email, password1, password2) => {
  const errors = [];

  try {
    const result = await pool.query(
      "SELECT email FROM users WHERE email = $1 LIMIT 1",
      [email]
    );

    if (result.rows[0]) errors.push(`User with email ${email} already exists.`);
    if (!emailRegex.test(email)) errors.push("Email must be valid.");
    if (password1 !== password2) errors.push("Passwords do not match.");
    if (password1.length < 8)
      errors.push("Password must be at least 8 characters.");
    if (!/\d/.test(password1))
      errors.push("Password must contain at least 1 number.");
    if (!/[A-Z]/.test(password1))
      errors.push("Password must contain at least 1 uppercase letter.");
  } catch (error) {
    console.log(error.message);
    errors.push("An unexpected error occurred. Please try again.");
  }

  return errors;
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiration,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  validateNewUser,
  generateAccessToken,
  generateRefreshToken,
};
