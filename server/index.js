const cors = require("cors");
const express = require("express");
const { createResponse } = require("./common/functions.js");
const { authenticate, authorize } = require("./middleware/auth.js");
const app = express();

// APP SETTINGS
app.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);
app.use(express.json());

// ROUTES
app.get("/", authenticate, authorize(["SUPERADMIN"]), async (req, res) => {
  const response = createResponse(true, "Health check passed.", [], {});
  return res.status(200).json(response);
});
app.use("/auth", require("./routes/auth.route.js"));
app.use("/user", require("./routes/user.route.js"));
app.use("/club", require("./routes/club.route.js"));

// SETUP DB
const db = require("./models/index.js");
db.sequelize.sync();
/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
}); */

// START SERVER
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
