const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    productName: String,
    productPrice: String,
    productImage: String,
    productDesc: String

}, { collection: "product" });

mongoose.model("product", productSchema);