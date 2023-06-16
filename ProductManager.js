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
