const router = require("express").Router();
const brandController = require("../controller/Brand");
const isAuth = require("../middlewares/isAuth");
// const requireUser = require("../middlewares/requireUser");

router.post("/", isAuth, brandController.createBrand);
router.get("/", isAuth, brandController.fetchBrands);

module.exports = router;
