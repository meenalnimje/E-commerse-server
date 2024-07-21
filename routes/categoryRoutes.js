const router = require("express").Router();
const categoryController = require("../controller/Brand");
const isAuth = require("../middlewares/isAuth");
const requireUser = require("../middlewares/requireUser");
// const requireUser = require("../middlewares/requireUser");

router.get("/", isAuth, categoryController.fetchBrands);
router.post("/", isAuth, categoryController.createBrand);

module.exports = router;
