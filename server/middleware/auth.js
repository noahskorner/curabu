const jwt = require("jsonwebtoken");
const { UserRoles } = require("../models");

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
  return async (req, res, next) => {
    const userId = req.user.id;

    await User.findOne({ _id: userId })
      .then((user) => {
        if (!user) return res.sendStatus(403);
        else if (!user.roles.some((role) => permittedRoles.includes(role)))
          return res.sendStatus(403);
        next();
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(403);
      });
  };
};

module.exports = {
  authenticate,
  authorize,
};
