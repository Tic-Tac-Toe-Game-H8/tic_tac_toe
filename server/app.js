const express = require("express");
const cors = require("cors")

const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(port, () => {
  console.log('listening on PORT 3000');
});