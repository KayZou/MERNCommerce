const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const { connection } = require("./db/db");
const db = connection();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(cookieParser());

const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const productsRoutes = require("./routes/products-route");
const usersRoutes = require("./routes/users-route");
const ordersRoutes = require("./routes/orders-route");
const uploadRoute = require("./routes/uploadRoutes");

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Set your frontend origin here
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/api/upload", uploadRoute);
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);

app.use(notFound);
app.use(errorHandler);

db.connectToMongo();

app.listen(4000 || process.env.PORT, () => {
  console.log("khdam; http://localshost:4000");
});
