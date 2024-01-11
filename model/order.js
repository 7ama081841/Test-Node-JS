const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    total: { type: Number },
    productList: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    orderAt: { type: Date, default: new Date() },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
