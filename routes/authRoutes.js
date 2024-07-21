const router = require("express").Router();
const authController = require("../controller/Auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/refresh", authController.refreshAccessToken);
router.post("/logout", authController.logout);
module.exports = router;
