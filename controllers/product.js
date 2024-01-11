const Product = require("../model/product");

const addProduct = async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body });

        await newProduct.save();

        res.status(200).json({
            success: true,
            message: "successduly created",
            data: {
                product: newProduct,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            message: "successduly created",
            data: {
                products,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};
const getOneProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);

        res.status(200).json({
            success: true,
            message: "successduly created",
            data: {
                product,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const newQuantity = req.body.quantity;
    console.log(newQuantity);
    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            { $inc: { quantity: -newQuantity } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "successduly created",
            data: {
                product,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getOneProduct,
    updateProduct,
};
