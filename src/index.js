require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectMongodbURL = require("./db/mongodb");
const router = require("./router/api/v1/index");
const cookieParser = require("cookie-parser");

const app = express();

// DATABASE CONNECTIONS
connectMongodbURL();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-lovat-seven-nuemyogf7z.vercel.app/",
    ],
    credentials: true,
  })
);

// SESSION
// app.use(
//   require("express-session")({
//     secret: process.env.EXPRESS_SESSION,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// MIDDLEWARE
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

// BASIC ROUTE
app.get("/", (req, res) => {
  res.send("Welcome to Node API v1");
});

// API ROUTES
app.use("/api/v1", router);

// SERVER START
app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT: ${process.env.PORT}`);
});
