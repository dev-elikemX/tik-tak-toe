const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = X_CLASS;
let gameActive = true;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  currentPlayer = X_CLASS;
  gameActive = true;
  statusDisplay.innerText = "Player X's turn";
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = currentPlayer === X_CLASS ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    updateStatus();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass.toUpperCase();
}

function swapTurns() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

function updateStatus() {
  statusDisplay.innerText = currentPlayer === X_CLASS ? "Player X's turn" : "Player O's turn";
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    statusDisplay.innerText = "It's a draw!";
  } else {
    statusDisplay.innerText = `${currentPlayer === X_CLASS ? "Player X" : "Player O"} wins!`;
  }
  gameActive = false;
}
