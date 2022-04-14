require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

app.use(express.json());
app.use(fileUpload());

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const adminRoute = require("./routers/user");
const roleRouter = require("./routers/role");
const permitRouter = require("./routers/permit");
const categoryRouter = require("./routers/category");
const postRouter = require("./routers/post");

app.use("/admin", adminRoute);
app.use("/role", roleRouter);
app.use("/permit", permitRouter);
app.use("/category", categoryRouter);
app.use("/post", postRouter);

const migration = require("./migrations/migration");

app.get("*", (req, res, next) => {
  res.send("<h1>404 Not Found</h1>");
});

app.use((err, req, res, next) => {
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

const DataManagements = () => {
  migration.migrator();
};
DataManagements();

app.listen(process.env.PORT, () => {
  console.log(`this port is running from http://127.0.0.1:${process.env.PORT}`);
});
