const { Server } = require('ws');
const express = require('express');
var cors = require('cors');
const userRouter = require("./users/userRouter");
const User = require("./users/userDb");

const server = express();

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(User.get());
  });
}, 1000);

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
