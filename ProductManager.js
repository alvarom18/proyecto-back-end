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

function getProducts() {
  return [
    { id: 1, name: "Samsung Galaxy S22", price: 1000 },
    { id: 2, name: "Samsung Galaxy S22 Ultra", price: 1100 },
    { id: 3, name: "Iphone 13", price: 1400 },
  ];
}

function sortProducts(products, sort) {}

function filterProducts(products, query) {}

function paginateProducts(products, limit, page) {}

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const sort = req.query.sort;
  const query = req.query.query;

  let products = getProducts();

  if (sort) {
    products = sortProducts(products, sort);
  }

  if (query) {
    products = filterProducts(products, query);
  }

  products = paginateProducts(products, limit, page);

  res.json(products);
});

module.exports = router;

const express = require("express");
const passport = require("passport");
const currentStrategy = require("./currentStrategy");

const app = express();

app.use(passport.initialize());

passport.use(currentStrategy);

const checkRole = (role) => {
  return (req, res, next) => {
    const user = req.user;

    if (user && user.role === role) {
      next();
    } else {
      res.status(403).send("No tienes permiso para acceder a este recurso");
    }
  };
};

app.get("/", (req, res) => {
  res.send("Bienvenido a la aplicación");
});

app.get(
  "/profile",
  passport.authenticate("current", { session: false }),
  checkRole("user"),
  (req, res) => {
    const user = req.user;

    res.send(user);
  }
);

app.get(
  "/admin",
  passport.authenticate("current", { session: false }),
  checkRole("admin"),
  (req, res) => {
    res.send("Acceso concedido al panel administrativo");
  }
);

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
