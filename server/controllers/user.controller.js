const pool = require("../config/db.config");
const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");
const { Users, Roles, Clubs } = require("../models");

// Variables

// Functions

// Controllers
const getUser = async (req, res) => {
  const userId = req.user.id;

  const user = await Users.findByPk(userId, {
    include: ["roles", { model: Clubs, as: "clubs", include: "bookClubs" }],
  })
    .then((data) => {
      return data.toJSON();
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(403);
    });

  return res.status(200).json(user);
};

module.exports = {
  getUser,
};
