require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { default: mongoose } = require("mongoose");
const createError = require("http-errors");
const app = express();

/** Global Middleware */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const formRoutes = require("./routes/formRoutes");
app.use("/api", formRoutes);

app.get("/", (req, res) => {
  return res.status(200).json("api is working");
});

app.use("*", (req, res, next) => {
  return next(createError(404, "Route not found"));
});

/** Error Handling Middleware */
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res
    .status(error.status || 500)
    .json({ message: error.message || "something went wrong" });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("connected to mongodb");

    app.listen(process.env.PORT, () => {
      console.log("server started on port : ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("failed to connect to mongodb ", error.message);
  });
