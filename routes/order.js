const router = require("express").Router();
const orderControllers = require("../controllers/order");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");

router.post("/order", auth, orderControllers.addOrder);
router.get("/orders", auth, orderControllers.getOrderList);
router.get("/order/:orderId", auth, orderControllers.getOneOrder);

module.exports = router;
