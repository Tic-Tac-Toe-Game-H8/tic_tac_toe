const express = require("express");
const cors = require("cors");

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

  socket.on("userConnect", (player) => {
    players.push(player);
    io.emit("userConnected", players);

    // Kalau jumlah player udah 2 mulai game dengan mengirim turn (player)
    if (players.length === 2) {
      resetGame();
      io.emit("sendTurn", players[turn]);
    }
  });

  socket.on("setPosition", (position) => {
    const value = "";

    // Mengirim posisi ke semua player
    io.emit("sendPosition", position);

    // Untuk mengisi board
    if (turn === 0) value = "x";
    else if (turn === 1) value = "o";

    board[position] = value;

    // Check apakah user menang
    if (checkForWinCondition(board, position)) {
      io.emit("sendWinner", players[turn]);
      resetGame();
    } else {
      // Untuk ganti turn
      turn = turn === 0 ? 1 : 0;
      io.emit("sendTurn", players[turn]);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const checkForWinCondition = (board, latestPosition) => {
  const value = board[latestPosition];

  const checkPositions = (a, b, c) =>
    board[a] === value && board[b] === value && board[c] === value && [a, b, c];

  return (
    checkPositions(0, 1, 2) ||
    checkPositions(3, 4, 5) ||
    checkPositions(6, 7, 8) ||
    checkPositions(0, 3, 6) ||
    checkPositions(1, 4, 7) ||
    checkPositions(2, 5, 8) ||
    checkPositions(0, 4, 8) ||
    checkPositions(2, 4, 6)
  );
};

const resetGame = () => {
  turn = 0;
  players = [];
  board = ["", "", "", "", "", "", "", "", ""];
};
