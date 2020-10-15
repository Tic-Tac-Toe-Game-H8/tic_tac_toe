const express = require("express");
const cors = require("cors");
const { resetGame, checkForWinCondition } = require("./helpers/tictactoe");

const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let players = [];
let board = ["", "", "", "", "", "", "", "", ""];
let turn = 0;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("playerName", (name) => {
    players.push(name);
    if (players.length === 2) {
      io.emit("start", players);
    }
  });

  socket.on("setPosition", (position) => {
    const value = "";
    if (turn === 0) value = "x";
    else if (turn === 1) value = "o";

    board[position] = value;
    if (checkForWinCondition(board, position)) {
      io.emit("winner", players[turn]);
      resetGame();
    } else {
      turn = turn === 0 ? 1 : 0;
      io.emit("changeTurn", players[turn]);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
