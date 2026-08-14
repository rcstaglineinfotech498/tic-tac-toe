const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const cells = Array.from(document.querySelectorAll(".cell"));

let board = Array(9).fill(null);
let currentPlayer = "X";
let running = true;

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateStatus() {
  if (!running) return;
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(e) {
  const btn = e.currentTarget;
  const idx = Number(btn.dataset.index);
    console.log(idx)


  if (!running || board[idx]) return;

  board[idx] = currentPlayer;
  console.log(board[idx])
  btn.classList.add(currentPlayer.toLowerCase());
  btn.textContent = currentPlayer;

  if (checkWin()) {
    statusEl.textContent = `Player ${currentPlayer} wins!`;
    running = false;
    return;
  }

  if (board.every(Boolean)) {
    statusEl.textContent = `It's a draw`;
    running = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function checkWin() {
  for (const combo of wins) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWin(combo);
      // console.log(combo)
      return true;
    }
  }
  return false;
}
function highlightWin(combo) {
  combo.forEach((i) => {
    const el = cells[i];
    el.classList.add("win");
  });
}

function resetGame() {
  board.fill(null);
  currentPlayer = "X";
  running = true;
  cells.forEach((c) => {
    c.textContent = "";
    c.className = "cell";
  });
  updateStatus();
}

cells.forEach((c) => c.addEventListener("click", handleCellClick));
// cells.forEach((c) =>
//   c.addEventListener("keydown", (e) => {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       c.click();
//     }
//   }),
// );
restartBtn.addEventListener("click", resetGame);

updateStatus();
