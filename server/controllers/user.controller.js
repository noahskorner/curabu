const pool = require("../config/db");
const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");

// Variables

// Functions

// Controllers
const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await Promise.all([
      pool.query(
        "SELECT id, date_created, username, email FROM users WHERE id = $1;",
        [userId]
      ),
      pool.query(
        "SELECT * FROM clubs WHERE id IN (SELECT club_id FROM user_clubs WHERE user_id = $1);",
        [userId]
      ),
    ]);

    const user = {
      id: results[0].rows[0].id,
      dateCreated: results[0].rows[0].date_created,
      username: results[0].rows[0].username,
      email: results[0].rows[0].email,
      clubs: results[1].rows,
    };

    const response = createResponse(
      true,
      `Succesfully fetched user ${user.email}`,
      [],
      user
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

module.exports = {
  getUser,
};
