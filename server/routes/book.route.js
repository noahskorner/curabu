const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const { addBook } = require("../controllers/book.controller");

router.post("/", authenticate, addBook);

module.exports = router;
