const mongoose = require("mongoose");

const productSchima = mongoose.Schema({
    productName: { type: String, required: true },
    descreption: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    sellerId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
    },
});

const Product = mongoose.model("Product", productSchima);

module.exports = Product;
