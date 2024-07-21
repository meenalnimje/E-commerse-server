const router = require("express").Router();
const productController = require("../controller/Product");
const isAuth = require("../middlewares/isAuth");
const requireUser = require("../middlewares/requireUser");

router.post("/createProduct", isAuth, productController.createProduct);
router.get("/", isAuth, productController.fetchAllProducts);
router.get("/totalProducts", isAuth, productController.fetchTotalProductNumber);
router.get("/:id", isAuth, productController.fetchProductById);
router.patch("/:id", isAuth, productController.updateProduct);

module.exports = router;
