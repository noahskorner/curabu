const router = require("express").Router();
const { authenticate, authorize } = require("../middleware/auth");
const { addClub } = require("../controllers/club.controller");
const { roles } = require("../common/constants");

router.post("/", authenticate, authorize([roles.superadmin]), addClub);

module.exports = router;
