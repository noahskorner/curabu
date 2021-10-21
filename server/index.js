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

// DEV ONLY
// db.sequelize.sync({ force: true }).then(async () => {
//   await db.sequelize.query("INSERT INTO public.roles(name) VALUES ('SUPERADMIN');");
//   await db.sequelize.query("INSERT INTO public.roles(name) VALUES ('ADMIN');");
//   await db.sequelize.query("INSERT INTO public.users(id, username, email, password) VALUES (1,'noah-got-hacked', 'noahskorner@gmail.com', '$2b$10$KhJqZrmfX73RIUyhLw5zHOaBORx.d689EeqTEUkq0jAoMUHKDkfxe');");
//   await db.sequelize.query("INSERT INTO public.\"userRoles\"(\"userId\", \"role\") VALUES (1, 'SUPERADMIN');");
//   await db.sequelize.query("INSERT INTO public.\"clubTypes\"(name) VALUES ('BOOK_CLUB');");
//   console.log("Drop and re-sync db...");
// });

// START SERVER
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
