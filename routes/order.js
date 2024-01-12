const router = require("express").Router();
const orderControllers = require("../controllers/order");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");

router.post("/order", auth, orderControllers.addOrder);
router.get("/orders", [auth, admin], orderControllers.getOrderList);
router.get("/order/:orderId", [auth, admin], orderControllers.getOneOrder);

module.exports = router;
