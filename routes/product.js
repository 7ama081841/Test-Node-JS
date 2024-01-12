const router = require("express").Router();
// const authenticate = require("../middlewares/bearer");
const productControllers = require("../controllers/product");

router.post("/product", productControllers.addProduct);
router.get("/products", productControllers.getProducts);
router.get("/product/:productId", productControllers.getOneProduct);
router.patch("/product/:productId", productControllers.updateProduct);

module.exports = router;
