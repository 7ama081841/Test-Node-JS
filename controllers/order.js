const Order = require("../model/order");
const Product = require("../model/product");

const addOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            ...req.body,
        });

        await newOrder.save();

        const savedOrder = await Order.findById({
            _id: newOrder._id,
        })
            .populate({
                path: "productList.product",
                model: "Product",
                select: "productName descreption quantity price",
            })
            .exec();

        const getPrice = savedOrder.productList.map(
            (item) => item.product.price * item.quantity
        );

        const total = getPrice.reduce((a, b) => a + b);

        const updatedOrder = await Order.findByIdAndUpdate(
            newOrder._id,
            { $set: { total } },
            { new: true }
        );

        await updateProductQuant(newOrder);

        res.status(200).json({
            success: true,
            message: "successduly created",
            data: {
                order: updatedOrder,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const updateProductQuant = async (order) => {
    for (const product of order.productList) {
        const productId = product.product;
        const quantityToReduce = product.quantity;

        await Product.findOneAndUpdate(
            { _id: productId },
            { $inc: { quantity: -quantityToReduce } }
        );
    }
};

const getOrderList = async (req, res) => {
    try {
        const orderList = await Order.find()
            .populate("productList.product", "-_id -sellerId -__v")
            .populate("client", "-_id -password -role -__v ")
            .select("-__v");

        res.status(200).json({
            success: true,
            message: "successduly ",
            data: {
                orderList,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const getOneOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .select("-__v")
            .populate("productList.product", "-_id -sellerId -__v")
            .populate("client", "-_id -password -role -__v ");

        res.status(200).json({
            success: true,
            message: "successduly ",
            data: {
                order,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

module.exports = {
    addOrder,
    getOrderList,
    getOneOrder,
};
