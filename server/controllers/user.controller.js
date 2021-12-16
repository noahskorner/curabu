const pool = require("../config/db.config");
const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");
const { User } = require("../models.mongo");

// Variables

// Functions

// Controllers
const getUser = async (req, res) => {
  const userId = req.user._id;

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) return res.sendStatus(400);
      else {
        const response = createResponse(
          true,
          `Successfully found user ${user.email}`,
          [],
          user.toJSON()
        );
        return res.status(200).json(response);
      }
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).json(createUnkownErrorResponse());
    });
};

// const joinClub = async (req, res) => {
//   const userId = req.user.id;
//   const { clubId } = req.body;

//   // make sure that club exists
//   const club = await Clubs.findByPk(clubId, { include: {} })
//     .then((data) => data)
//     .catch((error) => {
//       console.log(error);
//       const response = createUnkownErrorResponse();
//       return res.status(500).json(response);
//     });

//   console.log(club);

//   if (!club) {
//     const response = createResponse(
//       false,
//       "Unable to join club.",
//       [`Club with id ${clubId} does not exist.`],
//       {}
//     );
//     return res.status(400).json(response);
//   }

//   // create the user club
//   await UserClubs.create({
//     userId,
//     clubId,
//   }).catch((error) => {
//     console.log(error);
//     const response = createUnkownErrorResponse();
//     return res.status(500).json(response);
//   });

//   return getUser(req, res);
// };

module.exports = {
  getUser,
};
