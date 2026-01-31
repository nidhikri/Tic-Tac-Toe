let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

let player1 = "";
let player2 = "";

const cells = document.querySelectorAll("td");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Start Game
startBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  if (player1 === "" || player2 === "") {
    statusText.textContent = "Please enter both player names";
    return;
  }

  resetBoard();
  statusText.textContent = player1 + "'s turn (X)";
});

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleMove(index));
});

function handleMove(index) {
  if (board[index] !== "" || gameOver || player1 === "") return;

  board[index] = currentPlayer;
  document.getElementById(`cell-${index}`).textContent = currentPlayer;

  if (checkWin()) {
    let winnerName = currentPlayer === "X" ? player1 : player2;
    statusText.textContent = winnerName + " wins!";
    gameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  // Switch player
  if (currentPlayer === "X") {
    currentPlayer = "O";
    statusText.textContent = player2 + "'s turn (O)";
  } else {
    currentPlayer = "X";
    statusText.textContent = player1 + "'s turn (X)";
  }
}

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === currentPlayer)
  );
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayer = "X";
  cells.forEach(cell => cell.textContent = "");
}

resetBtn.addEventListener("click", () => {
  resetBoard();
  if (player1 && player2) {
    statusText.textContent = player1 + "'s turn (X)";
  } else {
    statusText.textContent = "Enter player names to start";
  }
});
