const router = require("express").Router();
const cartController = require("../controller/Cart");
const isAuth = require("../middlewares/isAuth");
const requireUser = require("../middlewares/requireUser");
// const requireUser = require("../middlewares/requireUser");

router.post("/", isAuth, cartController.addToCart);
router.get("/", isAuth, cartController.fetchCartByUser);
router.patch("/:id", isAuth, cartController.updateCart);
router.delete("/:id", isAuth, cartController.deleteFromCart);

module.exports = router;
