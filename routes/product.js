const router = require("express").Router();
const productControllers = require("../controllers/product");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");

router.post("/product", [auth, admin], productControllers.addProduct);
router.patch(
    "/product/:productId",
    [auth, admin],
    productControllers.updateProduct
);
router.get("/products", auth, productControllers.getProducts);
router.get("/product/:productId", auth, productControllers.getOneProduct);

module.exports = router;
