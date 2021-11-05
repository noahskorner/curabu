const router = require("express").Router();
const { authenticate, authorize } = require("../middleware/auth");
const { addClub, getClubs } = require("../controllers/club.controller");
const { roles } = require("../common/constants");

router.post("/", authenticate, authorize([roles.superadmin]), addClub);
router.get("/", getClubs);

module.exports = router;
