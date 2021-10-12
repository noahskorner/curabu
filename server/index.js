const cors = require("cors");
const express = require("express");
const app = express();
const pool = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validateNewUser,
  generateAccessToken,
  generateRefreshToken,
  validateTodo,
} = require("./common/functions");
const { refreshTokenExpiration } = require("./common/constants");
const { authenticateToken } = require("./middleware/auth");

// MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);
app.use(express.json()); //req.body

// ROUTES
app.get("/", async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Health check passed.",
  });
});

app.post("/register", async (req, res) => {
  try {
    const { email, password1, password2 } = req.body;

    const errors = await validateNewUser(email, password1, password2);

    if (errors.length)
      return res.status(400).json({
        success: true,
        message: "Unable to create new user.",
        errors,
      });
    else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password1, salt);

      const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword]
      );
      const user = result.rows[0];

      return res.status(201).json({
        success: true,
        message: `Successfully created user ${email}`,
        email: user.email,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!result.rows.length) {
      return res.status(400).send({
        errors: ["User with that email / password combination does not exist."],
      });
    }

    try {
      const user = result.rows[0];
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = generateAccessToken({
          id: user.id,
          email: user.email,
        });
        const refreshToken = generateRefreshToken({
          id: user.id,
          email: user.email,
        });

        try {
          const validUntil = new Date();
          validUntil.setDate(new Date().getDate() + refreshTokenExpiration);
          await pool.query(
            "INSERT INTO refreshTokens (token, userId, validUntil) VALUES ($1, $2, $3)",
            [refreshToken, user.id, validUntil]
          );
        } catch (error) {
          console.log(error.message);
          return res.sendStatus(500);
        }

        return res.json({ accessToken, refreshToken });
      } else {
        return res.status(400).send({
          errors: [
            "User with that email / password combination does not exist.",
          ],
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(500);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
});

app.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    try {
      // who do you even know here?
      const result = await pool.query(
        "SELECT * FROM refreshTokens WHERE token = $1",
        [refreshToken]
      );
      if (!result.rows.length) return res.sendStatus(403);

      // how old are you chief?
      if (new Date() > new Date(result.rows[0]["validUntil"])) {
        // nah fam that token is expired
        try {
          await pool.query("DELETE FROM refreshTokens WHERE token = $1 ", [
            refreshToken,
          ]);
          return res.sendStatus(403);
        } catch (error) {
          console.log(error);
          return res.sendStatus(500);
        }
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }

    // say bye to that old refresh token pal
    try {
      await pool.query("DELETE FROM refreshTokens WHERE token = $1", [
        refreshToken,
      ]);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }

    // alright buddy, come in for now
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, user) => {
        if (error) res.sendStatus(403);
        const accessToken = generateAccessToken({
          id: user.id,
          email: user.email,
        });
        const refreshToken = generateRefreshToken({
          id: user.id,
          email: user.email,
        });

        const validUntil = new Date();
        validUntil.setDate(new Date().getDate() + refreshTokenExpiration);
        await pool.query(
          "INSERT INTO refreshTokens (token, userId, validUntil) VALUES ($1, $2, $3)",
          [refreshToken, user.id, validUntil]
        );
        return res.json({ accessToken, refreshToken });
      }
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

app.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    try {
      const result = await pool.query(
        "SELECT * FROM refreshTokens WHERE token = $1",
        [refreshToken]
      );
      if (!result.rows.length) return res.sendStatus(403);

      try {
        await pool.query("DELETE FROM refreshTokens WHERE token = $1 ", [
          refreshToken,
        ]);
        return res
          .status(200)
          .json({ success: true, message: "Successfully logged out!" });
      } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
      }
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(500);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
});

// SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
