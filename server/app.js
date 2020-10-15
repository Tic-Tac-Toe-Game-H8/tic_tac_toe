const express = require("express");
const cors = require("cors")

const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let players = [];
const board = ['', '', '', '', '', '', '', '', '']
const status = ''

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("playerName", name=> {
    players.push(name);
    if (players.length === 2) {
      io.emit("start", players)
    }
  })

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
});


checkWin()



http.listen(port, () => {
  console.log('listening on PORT 3000');
});