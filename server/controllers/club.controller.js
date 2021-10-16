const pool = require("../config/db");
const { clubTypes } = require("../common/constants");
const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");

// Variables
const clubNameRegex = /^([a-zA-Z\s]){5,25}$/;

// Functions
const validateClub = async (name, clubType) => {
  const errors = [];
  try {
    const result = await pool.query("SELECT * FROM clubs WHERE name = $1", [
      name,
    ]);
    if (result.rows[0]) errors.push(`A club named ${name} already exists.`);
    if (!clubNameRegex.test(name))
      errors.push("Club name can only consist of letters and spaces.");
  } catch (error) {
    console.log(error.message);
    errors.push("An unexpected error has occured. Please try again");
  }
  return errors;
};

const validateBookClub = async (name, clubType) => {
  const errors = await validateClub(name, clubType);

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
  const errors = validateBookClub(name, clubType);

  if (errors.length) {
    const response = createResponse(
      false,
      "Unable to add new club.",
      errors,
      {}
    );
    return res.status(400).json(response);
  } else {
    const result = await pool.query(
      "INSERT INTO clubs(name, club_type) VALUES ($1, (SELECT id FROM club_types WHERE name = $2)) RETURNING *",
      [name, clubType]
    );
    const club = result.rows[0];
    const response = createResponse(
      true,
      `Succesfully created club ${name}!`,
      [],
      club
    );
    return res.status(200).json(response);
  }
};

module.exports = {
  addClub,
};
