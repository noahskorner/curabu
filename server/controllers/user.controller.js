const pool = require("../config/db.config");
const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");
const { Users, Clubs, BookClubs, UserClubs } = require("../models");

// Variables

// Functions

// Controllers
const getUser = async (req, res) => {
  const userId = req.user.id;

  const user = await Users.findByPk(userId)
    .then((data) => data)
    .catch((error) => {
      console.log(error);
      return res.sendStatus(403);
    });

  return res.status(200).json(user);
};

const joinClub = async (req, res) => {
  const userId = req.user.id;
  const { clubId } = req.body;

  // make sure that club exists
  const club = await Clubs.findByPk(clubId, { include: {} })
    .then((data) => data)
    .catch((error) => {
      console.log(error);
      const response = createUnkownErrorResponse();
      return res.status(500).json(response);
    });

  console.log(club);

  if (!club) {
    const response = createResponse(
      false,
      "Unable to join club.",
      [`Club with id ${clubId} does not exist.`],
      {}
    );
    return res.status(400).json(response);
  }

  // create the user club
  await UserClubs.create({
    userId,
    clubId,
  }).catch((error) => {
    console.log(error);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  });

  return getUser(req, res);
};

module.exports = {
  getUser,
};
