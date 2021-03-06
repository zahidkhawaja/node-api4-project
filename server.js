
const express = require('express');
var cors = require('cors');
const userRouter = require("./users/userRouter");
const User = require("./users/userDb");

const server = express();

server.use(cors());
server.use(logger);
server.use(express.json());
server.use("/api/users", userRouter);

server.get('/', (req, res) => {
  const message = process.env.MESSAGE;
  res.send(`<h2>${message}</h2>`);
});

//Middleware
function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} at ${new Date()}`);
  next();
}

module.exports = server;
