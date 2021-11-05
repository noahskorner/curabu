const router = require("express").Router();
const { authenticate, authorize } = require("../middleware/auth");
const {
  addClub,
  getClubs,
  addClubBook,
  updateClubBook,
} = require("../controllers/club.controller");
const { roles } = require("../common/constants");

router.post("/", authenticate, authorize([roles.superadmin]), addClub);
router.get("/", getClubs);
router.post("/books", authenticate, authorize([roles.superadmin]), addClubBook);
router.put(
  "/books",
  authenticate,
  authorize([roles.superadmin]),
  updateClubBook
);

module.exports = router;
