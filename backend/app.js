const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb").MongoClient;

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/products", productRoutes);
app.use("/", authRoutes);

mongodb
  .connect(
    "mongodb+srv://praveen:praveen123@cluster0.usgfxdn.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((client) => {
    console.log("Connected!");
    client.close();
  })
  .catch((err) => {
    console.log(err);
    console.log("throwing error");
  });

app.listen(3100);
