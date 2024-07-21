const router = require("express").Router();
const userController = require("../controller/User");
const isAuth = require("../middlewares/isAuth");
const requireUser = require("../middlewares/requireUser");

router.get("/myInfo", isAuth, userController.fetchUserById);
router.patch("/", isAuth, userController.updateUser);

module.exports = router;
