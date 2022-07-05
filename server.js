const express = require("express");
const server = express();

const morgan = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users-router");
const adminRouter=require("./routes/admin-router");
const restricted=require("./auth/middleware");
const helmet = require("helmet");

// Middleware
server.use(cors());
server.use(helmet())
server.use(express.json());

// Routers
server.use("/user", usersRouter);
server.use("/admin",restricted,adminRouter );
//server.use("/admin",adminRouter );

//Routes
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;

