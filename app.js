// if(process.env.NODE_ENV !== "production"){
//     require('dotenv').config();
// }
require("dotenv").config();

// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_KEY);

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Joi = require("joi"); //schema data validator for javascript
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const { required, string } = require("joi");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const helmet = require("helmet"); //Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
const mongoSanitize = require("express-mongo-sanitize"); //it will remove any prohibited character (ex-$, . etc) from query string

const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

const MongoStore = require("connect-mongo");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/party-animal";

// MongoDB connection options for production
const mongooseOptions = {
  ssl: process.env.NODE_ENV === "production",
  retryWrites: true,
  w: "majority",
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 1,
  tlsAllowInvalidCertificates: process.env.NODE_ENV === "production",
};

// Connect to MongoDB
mongoose.connect(dbUrl, mongooseOptions).catch((err) => {
  console.error("Initial MongoDB connection failed:", err);
  // Retry connection after 5 seconds
  setTimeout(() => {
    console.log("Retrying MongoDB connection...");
    mongoose.connect(dbUrl, mongooseOptions);
  }, 5000);
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
db.once("open", () => {
  console.log("Database Connected!");
});

const app = express();

app.engine("ejs", ejsMate); // we tell express thats the one we wanna use istead the default one
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); //it will parse the req body for us
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); //telling express to serve one public directory named public
// // To remove data, use:
// app.use(mongoSanitize());

// Or, to replace prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

// Set up client URL for production
const CLIENT_URL =
  process.env.CLIENT_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://partyanimal.onrender.com"
    : "http://localhost:3000");

const store = MongoStore.create({
  mongoUrl: dbUrl,
  mongoOptions: {
    ssl: process.env.NODE_ENV === "production",
    retryWrites: true,
    w: "majority",
  },
  secret,
  touchAfter: 24 * 60 * 60, //time period in seconds
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store, //shortcut of store:store, //telling to use store insteed of default memory
  name: "session", //since we dont want the default name 'connect.sid' which people can directly get to know so we put our own name it could be anything we are just changing name not hiding it
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, //these are little security features we can refer to docs to know more
    maxAge: 1000 * 60 * 60 * 24 * 7, //setting to expire in 7 days in milliseconds
    ...(process.env.NODE_ENV === "production"
      ? {
          secure: true, // Only true in production with HTTPS
          sameSite: "none", // For cross-site cookies in production
          domain: new URL(CLIENT_URL).hostname, // set domain for production
        }
      : {
          secure: false, // Not secure in development
          sameSite: "lax", // Lax for local development
        }),
  },
};
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Ensure this is BEFORE any routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.CLIENT_URL = CLIENT_URL;
  next();
});

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://kit.fontawesome.com/",
  "https://fonts.google.com/",
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
  "https://ka-f.fontawesome.com/",
];
const fontSrcUrls = [
  "'self'",
  "https://ka-f.fontawesome.com/",
  "https://kit.fontawesome.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`, //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        "https://source.unsplash.com/",
        "https://images.unsplash.com/",
        "https://images.pexels.com/",
        "https://www.pexels.com/",
        "https://fontawesome.com/",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

app.use("/", userRoutes);
app.use("/events", campgroundRoutes); //inside events routes all routes starting from /events.
app.use("/events/:id/reviews", reviewRoutes); //inside reviews routes all routes starting from /events/:id/reviews

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  if (!err.message) err.message = "Something Went Wrong";
  res.status(statusCode).render("error", { err });
});

const port = process.env.PORT || 3000; //process.env.PORT will be automatically present on heroku
app.listen(port, () => {
  console.log(`SERVING ON PORT ${port}!`);
});
