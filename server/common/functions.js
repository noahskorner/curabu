const pool = require("../db");
const jwt = require("jsonwebtoken");
const {
  usernameRegex,
  emailRegex,
  accessTokenExpiration,
  refreshTokenExpiration,
} = require("../common/constants");

const validateUser = async (username, email, password1, password2) => {
  const errors = [];

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2 LIMIT 1",
      [email, username]
    );

    if (result.rows[0])
      errors.push("User with that username or email already exists.");

    if (username.length < 5 || username.length > 25)
      errors.push("Username must be 5 - 25 characters long.");

    if (!usernameRegex.test(username))
      errors.push(
        "Username can only contain letters, numbers, hypens, underscores, and periods."
      );

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
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiration,
  });
};

module.exports = {
  validateUser,
  generateAccessToken,
  generateRefreshToken,
};
