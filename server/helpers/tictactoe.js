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

module.exports = { checkForWinCondition, resetGame };
