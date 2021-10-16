const pool = require("../config/db");
const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");

// Variables

// Functions

// Controllers
const addClub = async (req, res) => {
  try {
      
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

module.exports = {
  getUser,
};
