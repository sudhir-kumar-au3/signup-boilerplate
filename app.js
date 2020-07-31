const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const verifiedRouter = require("./routes/verifiedRoutes");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: [
      `${process.env.FRONT_URL}`,
      "http://localhost:8080",
      "https://mypage.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Welcome to Express!");
});

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/api", verifiedRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
