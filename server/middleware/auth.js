const jwt = require("jsonwebtoken");
const { createResponse } = require("../common/functions");
const pool = require("../config/db");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorize = (permittedRoles) => {
  return (req, res, next) => {
    const userId = req.user.id;

    pool.query(
      "SELECT name FROM roles WHERE id IN (SELECT role_id FROM user_roles WHERE user_id = $1);",
      [userId],
      (err, result) => {
        if (err) {
          console.log(error.message);
          const response = createUnkownErrorResponse();
          return res.status(500).json(response);
        } else {
          const userRoles = result.rows.map((role) => role.name);

          if (permittedRoles.some((r) => userRoles.includes(r))) {
            next();
          } else {
            const response = createResponse(
              false,
              "User does not have permission.",
              [],
              {}
            );
            return res.status(403).json(response);
          }
        }
      }
    );
  };
};

module.exports = {
  authenticate,
  authorize,
};
