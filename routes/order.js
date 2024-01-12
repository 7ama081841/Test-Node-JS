const router = require("express").Router();
const orderControllers = require("../controllers/order");

router.post("/order", orderControllers.addOrder);
router.get("/orders", orderControllers.getOrderList);
router.get("/order/:orderId", orderControllers.getOneOrder);

module.exports = router;
