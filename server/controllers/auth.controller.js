const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");

// Variables
const usernameRegex = /^[a-z0-9-_\.]+$/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const accessTokenExpiration = 1800; //seconds = 15 minutes
const refreshTokenExpiration = 15; //days

// Functions
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

// Controllers
const registerUser = async (req, res) => {
  try {
    const { username, email, password1, password2 } = req.body;
    const errors = await validateUser(username, email, password1, password2);

    if (errors.length) {
      const response = createResponse(
        false,
        "Unable to register new user.",
        errors,
        {}
      );
      return res.status(400).json(response);
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password1, salt);

      const result = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );
      const user = result.rows[0];

      const response = createResponse(
        true,
        `Successfully created user ${username}`,
        [],
        {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      );
      return res.status(201).json(response);
    }
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!result.rows.length) {
      const response = createResponse(
        false,
        "Unable to login user.",
        ["User with that email / password combination does not exist."],
        {}
      );
      return res.status(400).json(response);
    }

    try {
      const user = result.rows[0];
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = generateAccessToken({
          id: user.id,
          username: user.username,
          email: user.email,
        });
        const refreshToken = generateRefreshToken({
          id: user.id,
          username: user.username,
          email: user.email,
        });

        try {
          const validUntil = new Date();
          validUntil.setDate(new Date().getDate() + refreshTokenExpiration);
          await pool.query("DELETE FROM refresh_tokens WHERE user_id = $1", [
            user.id,
          ]);
          await pool.query(
            "INSERT INTO refresh_tokens (token, user_id, valid_until) VALUES ($1, $2, $3)",
            [refreshToken, user.id, validUntil]
          );
        } catch (error) {
          console.log(error.message);
          const response = createUnkownErrorResponse();
          return response;
        }

        const response = createResponse(
          true,
          `Successfully logged in ${user.email}`,
          [],
          {
            accessToken,
            refreshToken,
          }
        );
        return res.status(200).json(response);
      } else {
        const response = createResponse(
          false,
          "Unable to login user.",
          ["User with that email / password combination does not exist."],
          {}
        );
        return res.status(400).josn(response);
      }
    } catch (error) {
      console.log(error.message);
      const response = createUnkownErrorResponse();
      return response;
    }
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return response;
  }
};

const refreshUserToken = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      const response = createResponse(
        false,
        "Unable to refresh token.",
        ["No token provided."],
        {}
      );
      return res.status(401).json(response);
    }
    try {
      // who do you even know here?
      const result = await pool.query(
        "SELECT * FROM refresh_tokens WHERE token = $1",
        [refreshToken]
      );
      if (!result.rows.length) {
        const response = createResponse(
          false,
          "Unable to refresh token.",
          ["Token does not exist."],
          {}
        );
        return res.status(403).json(response);
      }

      // how old are you chief?
      if (new Date() > new Date(result.rows[0]["validUntil"])) {
        // nah fam that token is expired, delete all them old tokens
        try {
          await pool.query(
            "DELETE FROM refresh_tokens WHERE user_id IN (SELECT user_id FROM refresh_tokens WHERE token = $1 LIMIT 1)",
            [refreshToken]
          );
          const response = createResponse(
            false,
            "Unable to refresh token.",
            ["Token does not exist."],
            {}
          );
          return res.status(403).json(response);
        } catch (error) {
          const response = createUnkownErrorResponse();
          return response;
        }
      }
    } catch (error) {
      const response = createUnkownErrorResponse();
      return response;
    }

    // say bye to that old refresh token pal
    try {
      await pool.query(
        "DELETE FROM refresh_tokens WHERE user_id IN (SELECT user_id FROM refresh_tokens WHERE token = $1 LIMIT 1)",
        [refreshToken]
      );
    } catch (error) {
      const response = createUnkownErrorResponse();
      return response;
    }

    // alright buddy, come in for now
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, user) => {
        if (error) res.sendStatus(403);
        const accessToken = generateAccessToken({
          id: user.id,
          username: user.username,
          email: user.email,
        });
        const refreshToken = generateRefreshToken({
          id: user.id,
          username: user.username,
          email: user.email,
        });

        const validUntil = new Date();
        validUntil.setDate(new Date().getDate() + refreshTokenExpiration);
        await pool.query(
          "INSERT INTO refresh_tokens (token, user_id, valid_until) VALUES ($1, $2, $3)",
          [refreshToken, user.id, validUntil]
        );
        const response = createResponse(
          true,
          `Successfully refreshed token for user ${user.email}`,
          [],
          { accessToken, refreshToken }
        );
        return res.status(200).json(response);
      }
    );
  } catch (error) {
    const response = createUnkownErrorResponse();
    return response;
  }
};

const logoutUser = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      await pool.query("DELETE FROM refresh_tokens WHERE user_id = $1", [
        userId,
      ]);

      const response = createResponse(true, `Successfully logged out!`, [], {});
      return res.status(200).json(response);
    } catch (error) {
      const response = createUnkownErrorResponse();
      return res.status(500).json(response);
    }
  } catch (error) {
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser,
};
