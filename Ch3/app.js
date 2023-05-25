var createError = require("http-errors");
var express = require("express");
var path = require("path");
// cookie 선언
var cookieParser = require("cookie-parser");
// session 선언
var session = require("express-session");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// Ch3 - sub1
var sub1Router = require("./routes/sub1");
// Ch3 - sub2
var sub2Router = require("./routes/sub2");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie 설정
app.use(cookieParser());
// session 설정
app.use(
  session({
    secret: "secret@1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// Ch3 - sub1
app.use("/sub1", sub1Router);
// Ch3 - sub2
app.use("/sub2", sub2Router);

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
