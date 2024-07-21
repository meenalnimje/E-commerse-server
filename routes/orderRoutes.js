const router = require("express").Router();
const orderController = require("../controller/Order");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, orderController.fetchOrdersByUser);
router.get("/getOrders", isAuth, orderController.fetchAllOrders);
router.get("/totalOrders", isAuth, orderController.fetchTotalOrderNumber);
router.post("/", isAuth, orderController.createOrder);
router.patch("/:id", isAuth, orderController.updateOrder);
router.delete("/:id", isAuth, orderController.deleteOrder);

module.exports = router;
