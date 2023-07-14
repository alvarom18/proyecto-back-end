import { request, response } from "express";

class ProductManager {
  constructor(products) {
    this.products = [];
  }
  addProduct(product) {
    if (
      product.title &&
      product.description &&
      product.price &&
      product.id &&
      product.image &&
      product.stock
    ) {
      this.products.push(product);
    } else {
      throw new Error("El producto no tiene los requerimientos");
    }
  }
  getProduts() {
    return this.products;
  }

  getProdutsById() {
    let product = this.products.fild((p) => p.id === id);
    return product || null;
  }
}
const express = require("express");
const app = express();
const port = 8080;
const ProductsRouter = require("./products");
const cartRouter = require("./carts");
app.use("/api/products", ProductsRouter);
app.use("/api/cart", cartRouter);
app.listen(port, () => {
  console.log(`servidor ${port}`);
});

// Importar mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://<user>:<clave>@<host>:<port>/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  // Atributos del schema
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },
});

const Cart = mongoose.model("Cart", cartSchema);
const Message = mongoose.model("Message", messageSchema);
const Product = mongoose.model("Product", productSchema);

module.exports = {
  Cart,
  Message,
  Product,
};
