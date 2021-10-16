const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const { getUser } = require("../controllers/user.controller");

router.get("/", authenticate, getUser);

module.exports = router;
