const cors = require("cors");
const express = require("express");
const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);
app.use(express.json()); //req.body

// ROUTES
app.get("/", async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Health check passed.",
  });
});

// SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
