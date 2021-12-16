const pool = require("../config/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");
const { User, RefreshToken } = require("../models.mongo");

// Variables
const usernameRegex = /^[a-z0-9-_\.]+$/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const accessTokenExpiration = 900; // 15 minutes;
const refreshTokenExpiration = "15 days";

// Functions
const validateUser = async (username, email, password1, password2) => {
  const fieldErrors = {
    username: [],
    email: [],
    password1: [],
    password2: [],
  };

  // validate username
  if (!username) {
    fieldErrors.username.push("Must provide a username.");
  } else {
    if (username.length < 5 || username.length > 25)
      fieldErrors.username.push("Username must be 5 - 25 characters long.");

    if (!usernameRegex.test(username)) {
      fieldErrors.username.push(
        "Username can only contain letters, numbers, hypens, underscores, and periods."
      );
    }

    const findUsername = await User.find({
      username,
    })
      .then((data) => data)
      .catch((error) => {
        console.log(error);
        fieldErrors.username.push(
          "An unexpected error has occured. Please try again."
        );
        return fieldErrors;
      });

    if (findUsername.length)
      fieldErrors.username.push("User with that username already exists.");
  }

  // validate email
  if (!emailRegex.test(email)) {
    fieldErrors.email.push("Email must be valid.");
  } else {
    const findEmail = await User.find({
      email,
    })
      .then((data) => data)
      .catch((error) => {
        console.log(error);
        fieldErrors.email.push(
          "An unexpected error has occured. Please try again."
        );
        return fieldErrors;
      });

    if (findEmail.length)
      fieldErrors.email.push("User with that email already exists.");
  }

  // validate password
  if (!password1) {
    fieldErrors.password1.push("Must provide a password.");
  } else {
    if (password1.length < 8)
      fieldErrors.password1.push("Password must be at least 8 characters.");

    if (!/\d/.test(password1))
      fieldErrors.password1.push("Password must contain at least 1 number.");

    if (!/[A-Z]/.test(password1))
      fieldErrors.password1.push(
        "Password must contain at least 1 uppercase letter."
      );

    if (password1 !== password2)
      fieldErrors.password2.push("Passwords do not match.");
  }

  return fieldErrors;
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiration,
  });
};

const generateRefreshToken = async (user) => {
  const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiration,
  });

  // delete the old refresh tokens
  await RefreshToken.deleteMany({ user: user._id }).catch((error) => {
    console.log(error);
    return null;
  });

  // create a new one
  await RefreshToken.create({ token, user: user._id }).catch((error) => {
    console.log(error);
    return null;
  });

  return token;
};

// Controllers
const registerUser = async (req, res) => {
  try {
    const { username, email, password1, password2 } = req.body;
    const fieldErrors = await validateUser(
      username,
      email,
      password1,
      password2
    );

    if (
      fieldErrors.username.length ||
      fieldErrors.email.length ||
      fieldErrors.password1.length ||
      fieldErrors.password2.length
    ) {
      const response = createResponse(
        false,
        "Unable to register new user.",
        fieldErrors,
        {}
      );
      return res.status(400).json(response);
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password1, salt);

      await User.create({
        email,
        username,
        password: hashedPassword,
      }).catch((error) => {
        console.log(error.message);
        const response = createUnkownErrorResponse();
        return res.status(500).json(response);
      });

      const response = createResponse(
        true,
        `Successfully created user ${username}`,
        [],
        {}
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
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  })
    .select(["email", "username", "password"])
    .then((q) => {
      if (!q) return q;
      else return q.toJSON();
    })
    .catch((error) => {
      console.log(error.message);
      const response = createUnkownErrorResponse();
      return res.status(500).json(response);
    });

  if (!user) {
    const response = createResponse(
      false,
      "Unable to login user.",
      ["User with that email / password combination does not exist."],
      {}
    );
    return res.status(400).json(response);
  }

  if (await bcrypt.compare(password, user.password)) {
    delete user.password;

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    if (refreshToken === null) {
      const response = createUnkownErrorResponse();
      return res.status(400).json(response);
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
    return res.status(400).json(response);
  }
};

const refreshUserToken = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, user) => {
        if (error) {
          console.log(error);
          return res.sendStatus(403);
        }
        const accessToken = generateAccessToken({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
        });
        const refreshToken = await generateRefreshToken({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
        });

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
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

const logoutUser = async (req, res) => {
  try {
    await RefreshToken.deleteMany({ token: req.user.id });

    const response = createResponse(true, `Successfully logged out!`, [], {});
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
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
