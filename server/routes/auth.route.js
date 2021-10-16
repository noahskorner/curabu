const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserToken,
} = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshUserToken);
router.delete("/logout", authenticate, logoutUser);

module.exports = router;
