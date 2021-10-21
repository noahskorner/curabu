const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");
const { clubTypes } = require("../common/constants");
const { connectionString } = require("../config/db.config");
const { Clubs, BookClubs } = require("../models");
const clubs = require("../models/clubs");

// Variables
const clubNameRegex = /^([a-zA-Z\s']){5,25}$/;

// Functions
const validateClub = async (name) => {
  const errors = [];

  if (!name) {
    errors.push("Must provide club name.");
  } else {
    const clubExists = await Clubs.findAll({
      where: {
        name,
      },
    })
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        errors.push("An unexpected error has occured. Please try again.");
      });

    if (clubExists.length) errors.push(`A club named ${name} already exists.`);
    if (!clubNameRegex.test(name))
      errors.push("Club name can only consist of letters spaces and apostrophes.");
  }

  return errors;
};

const validateBookClub = async (name) => {
  const errors = await validateClub(name);
  return errors;
};

// Controllers
const addClub = async (req, res) => {
  try {
    const { clubType } = req.body;
    switch (clubType) {
      case clubTypes.bookClub:
        return addBookClub(req, res);
      default:
        const response = createResponse(
          false,
          "Unable to add new club.",
          [`Club type ${clubType} does not exist`],
          {}
        );
        return res.status(500).json(response);
    }
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

const addBookClub = async (req, res) => {
  const { name, clubType } = req.body;
  const errors = await validateBookClub(name);

  if (errors.length) {
    const response = createResponse(
      false,
      "Unable to add new club.",
      errors,
      {}
    );
    return res.status(400).json(response);
  } else {
    const club = await Clubs.create(
      {
        name,
        clubType,
        createdBy: req.user.id,
        bookClub: {},
        admins: {
          userId: req.user.id,
        },
      },
      { include: ["bookClub", "admins"] }
    ).catch((error) => {
      console.log(error);
      const response = createUnkownErrorResponse();
      return res.status(500).json(response);
    });

    const response = createResponse(
      true,
      `Succesfully created new book club ${name}!`,
      [],
      club
    );
    return res.status(200).json(response);
  }
};

module.exports = {
  addClub,
};
