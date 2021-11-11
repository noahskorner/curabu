const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const { addBook, searchBook } = require("../controllers/book.controller");

router.post("/", authenticate, addBook);
router.get("/search", authenticate, searchBook);

module.exports = router;
