const cors = require("cors");
const express = require("express");
const { createResponse } = require("./common/functions.js");
const { authenticate } = require("./middleware/auth.js");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);
app.use(express.json());
app.get("/", authenticate, async (req, res) => {
  const response = createResponse(true, "Health check passed.", [], {});
  return res.status(200).json(response);
});
app.use("/auth", require("./routes/auth.route.js"));
app.use("/user", require("./routes/user.route.js"));
app.use("/club", require("./routes/club.route.js"));

// SERVER START
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
