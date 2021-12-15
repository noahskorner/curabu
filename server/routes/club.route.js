const router = require("express").Router();
const { authenticate, authorize } = require("../middleware/auth");
const {
  addClub,
  getClubs,
  getClub,
  addClubBook,
  updateClubBook,
  addPost,
  addComment,
  findComment,
} = require("../controllers/club.controller");
const { roles } = require("../common/constants");

router.post("/", authenticate, authorize([roles.superadmin]), addClub);
router.get("/", getClubs);
router.get("/get-club/:clubId", getClub);
router.post("/books", authenticate, authorize([roles.superadmin]), addClubBook);
router.put(
  "/books",
  authenticate,
  authorize([roles.superadmin]),
  updateClubBook
);
router.post("/posts", authenticate, addPost);
router.post("/comments", authenticate, addComment);
router.get("/comments", findComment);

module.exports = router;
